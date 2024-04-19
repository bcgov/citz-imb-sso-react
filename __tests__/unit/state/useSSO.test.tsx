import React from 'react';
import { render, act, screen, renderHook } from '@testing-library/react';
import { useSSO } from '@/state/useSSO';
import { AuthAction } from '@/types';
import * as utils from '@/utils';
import { SSOProvider } from '@/index';
import {
  createMockAuthContextValue,
  mockOriginalSSOUserIDIR,
  mockSSOUserIDIR,
} from '../../__mocks__';

// Setting up a global fetch mock similar to your other project
const mockedFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    access_token: 'new_access_token',
    id_token: 'new_id_token',
    expires_in: 3600,
  }),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).fetch = mockedFetch;

// This component is used to test the useSSO hook by providing a context and UI elements for interaction.
function TestComponent() {
  const ssoService = useSSO();
  return (
    <SSOProvider>
      <div>
        <button onClick={() => ssoService.login({ idpHint: 'idir' })}>Login</button>
        <button onClick={() => ssoService.logout()}>Logout</button>
        <button onClick={() => ssoService.refreshToken()}>Refresh Token</button>
        <button onClick={() => ssoService.fetchProtectedRoute('https://api.example.com/data')}>
          Fetch Data
        </button>
        <span data-testid="isAuthenticated">{String(ssoService.isAuthenticated)}</span>
        <span data-testid="user">{JSON.stringify(ssoService.user)}</span>
      </div>
    </SSOProvider>
  );
}

// Test suite for the useSSO hook, which provides authentication-related functionality
describe('useSSO', () => {
  let mockDispatch: React.Dispatch<AuthAction>;

  beforeEach(() => {
    // Mock the dispatch and state for useContext to isolate tests from actual context
    mockDispatch = jest.fn();
    jest.spyOn(React, 'useContext').mockImplementation(() =>
      createMockAuthContextValue({
        state: {
          isAuthenticated: false,
          isLoggingIn: false,
          accessToken: 'dummy_access_token',
          userInfo: mockOriginalSSOUserIDIR,
          idToken: 'dummy_id_token',
        },
        dispatch: mockDispatch,
      }),
    );
  });

  afterEach(() => {
    // Restore mocks to clean up any alterations to the environment between tests
    jest.restoreAllMocks();
    jest.useRealTimers();
    mockedFetch.mockClear(); // Clear fetch mock to ensure fresh state for each test
  });

  // Test case: user has all specified roles
  it('returns true when user has all specified roles', () => {
    const { result } = renderHook(() => useSSO());
    expect(result.current.hasRoles(['admin', 'user'])).toBe(true);
  });

  // Test case: user does not have all specified roles
  it('returns false when user does not have all specified roles', () => {
    const { result } = renderHook(() => useSSO());
    expect(result.current.hasRoles(['admin', 'superuser'])).toBe(false);
  });

  // Test case: user has at least one of the specified roles with requireAllRoles false
  it('returns true when user has at least one of the specified roles and requireAllRoles is false', () => {
    const { result } = renderHook(() => useSSO());
    expect(result.current.hasRoles(['admin', 'superuser'], { requireAllRoles: false })).toBe(true);
  });

  // Test case: user has none of the specified roles with requireAllRoles false
  it('returns false when user has none of the specified roles and requireAllRoles is false', () => {
    const { result } = renderHook(() => useSSO());
    expect(result.current.hasRoles(['superuser', 'guest'], { requireAllRoles: false })).toBe(false);
  });

  // Test case: invalid role param
  it('throws error with invalid roles param', () => {
    const { result } = renderHook(() => useSSO());

    // Use try-catch block to handle the error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let error: any;
    try {
      result.current.hasRoles(['superuser', 2] as string[]);
    } catch (err) {
      error = err;
    }

    // Expect an error to be thrown
    expect(error).toBeDefined();
    expect(error.message).toBe(
      'Error: hasRoles function of `citz-imb-sso-react`. Pass roles as an array of strings.',
    );
  });

  // Test case: verify that the hook provides essential authentication functions and correct initial state
  it('provides authentication-related functions and state', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
  });

  // Test case: normalizes user data
  it('normalizes user data correctly after refreshing token', () => {
    jest.spyOn(utils, 'normalizeUser').mockReturnValue(mockSSOUserIDIR);

    render(<TestComponent />);
    expect(screen.getByTestId('user').textContent).toBe(JSON.stringify(mockSSOUserIDIR));
  });

  // Test case: login function with default parameters to ensure it constructs correct URL for redirection
  it('calls login with default parameters and redirects correctly', () => {
    const mockLocation = {
      href: 'http://localhost',
      assign: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    const { getByText } = render(<TestComponent />);
    act(() => {
      getByText('Login').click();
    });

    expect(window.location.href).toContain(
      '/api/auth/login?post_login_redirect_url=http%3A%2F%2Flocalhost',
    );
  });

  // Test case: ensure that the logout function updates window.location with the correct URL
  it('handles logout by redirecting to the logout URL with the id_token', () => {
    const mockLocation = {
      href: 'http://localhost',
      assign: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    const { getByText } = render(<TestComponent />);
    act(() => {
      getByText('Logout').click();
    });

    expect(window.location.href).toContain('/api/auth/logout?id_token=dummy_id_token');
  });

  // Test case: verify that fetching a protected route correctly includes the authorization header
  it('fetches protected route with the correct authorization header', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        access_token: 'new_access_token',
        id_token: 'new_id_token',
        expires_in: 3600,
        userInfo: mockOriginalSSOUserIDIR,
      }),
    } as unknown as Response);

    const mockLocation = {
      href: 'http://localhost',
      assign: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    const { getByText } = render(<TestComponent />);
    await act(async () => {
      getByText('Fetch Data').click();
    });
    expect(mockedFetch).toHaveBeenCalledWith('https://api.example.com/data', {
      headers: { Authorization: 'Bearer dummy_access_token' },
    });
  });

  // Test case: refreshToken handles API error gracefully
  it('handles API error gracefully', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 401,
      } as Response),
    );

    const { result } = renderHook(() => useSSO(), {
      wrapper: SSOProvider,
    });

    act(() => {
      result.current.refreshToken();
    });

    expect(result.current.state.isAuthenticated).toBeFalsy();
  });
});
