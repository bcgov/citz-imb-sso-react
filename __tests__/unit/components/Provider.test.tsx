import { render, act } from '@testing-library/react';
import { SSOProvider } from '@/index';

// Mocking the children component
const MockChildComponent = () => <div>Mock Child Component</div>;

// Test suite for SSOProvider component
describe('SSOProvider', () => {
  beforeEach(() => {
    // Mock window.location
    const mockLocation = {
      href: 'http://localhost:3000?refresh_expires_in=1&post_login_redirect_url=/redirect',
      assign: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });
  });

  // Test case: calls setIsExpiryDialogVisible when onRefreshExpiry is not specified
  it('calls setIsExpiryDialogVisible when onRefreshExpiry is not specified', () => {
    jest.useFakeTimers(); // Mock the timers

    // Spy on setTimeout
    const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

    // Render the SSOProvider without the onRefreshExpiry prop
    render(
      <SSOProvider>
        <MockChildComponent />
      </SSOProvider>,
    );

    // Fast-forward time to ensure useEffect callback is executed
    act(() => {
      jest.runAllTimers();
    });

    // Expect setTimeout to have been called
    expect(setTimeoutSpy).toHaveBeenCalled();

    jest.useRealTimers(); // Restore the real timers
  });

  // Test case: calls onRefreshExpiry when onRefreshExpiry is specified
  it('calls onRefreshExpiry when onRefreshExpiry isspecified', () => {
    jest.useFakeTimers(); // Mock the timers

    const onRefreshExpiryMock = jest.fn();

    // Render the SSOProvider without the onRefreshExpiry prop
    render(
      <SSOProvider onRefreshExpiry={onRefreshExpiryMock}>
        <MockChildComponent />
      </SSOProvider>,
    );

    // Fast-forward time to ensure useEffect callback is executed
    act(() => {
      jest.runAllTimers();
    });

    // Expect setTimeout to have been called
    expect(onRefreshExpiryMock).toHaveBeenCalled();

    jest.useRealTimers(); // Restore the real timers
  });
});
