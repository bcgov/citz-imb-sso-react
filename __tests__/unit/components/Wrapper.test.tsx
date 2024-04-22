import { render, act } from '@testing-library/react';
import { createUseSSOMock, mockUseSSO, resetUseSSOMock } from '../../__mocks__';
import { SSOProvider, useSSO } from '@/index';

// This component is used to test the useSSO hook by providing a context and UI elements for interaction.
function TestComponent() {
  const ssoService = useSSO();
  return (
    <SSOProvider>
      <div>
        <button onClick={() => ssoService.login({ idpHint: 'idir' })}>Login</button>
      </div>
    </SSOProvider>
  );
}

// Test suite for SSOWrapper component
describe('SSOWrapper', () => {
  beforeEach(() => {
    // Reset the mockUseSSO function before each test
    resetUseSSOMock(); // Reset the useSSO mock to clear any set behavior
    jest.clearAllMocks();

    // Setup default mock behavior for useSSO
    mockUseSSO.mockImplementation(() =>
      createUseSSOMock({
        isAuthenticated: false,
      }),
    );
  });

  // Test case: login function with default parameters
  it('calls login with default parameters and redirects correctly', () => {
    const mockLocation = {
      href: 'http://localhost',
      assign: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    // Render the component
    const { getByText } = render(<TestComponent />);

    // Trigger the login action
    act(() => {
      getByText('Login').click();
    });

    // Expect window.location.href to be set with the correct URL
    expect(window.location.href).toContain(
      '/api/auth/login?post_login_redirect_url=http%3A%2F%2Flocalhost',
    );
  });

  // Test case: login function with params and redirect starts with /
  it('calls login with parameters and redirects correctly, and redirect starts with /', () => {
    const mockLocation = {
      href: 'http://localhost:3000?refresh_expires_in=300&post_login_redirect_url=/redirect',
      assign: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    // Render the component
    const { getByText } = render(<TestComponent />);

    // Trigger the login action
    act(() => {
      getByText('Login').click();
    });

    // Expect window.location.href to be set with the correct URL
    expect(window.location.href).toContain(
      '/api/auth/login?post_login_redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fredirect&idp=idir',
    );
  });

  // Test case: login function with params
  it('calls login with parameters and redirects correctly', () => {
    const mockLocation = {
      href: 'http://localhost:3000?refresh_expires_in=300&post_login_redirect_url=http://localhost:4000',
      assign: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    // Render the component
    const { getByText } = render(<TestComponent />);

    // Trigger the login action
    act(() => {
      getByText('Login').click();
    });

    // Expect window.location.href to be set with the correct URL
    expect(window.location.href).toContain(
      '/api/auth/login?post_login_redirect_url=http%3A%2F%2Flocalhost%3A4000&idp=idir',
    );
  });
});
