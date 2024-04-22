import { render, screen, act } from '@testing-library/react';
import { RefreshExpiryDialog } from '@/components/RefreshExpiryDialog';
import { createUseSSOMock, mockUseSSO, resetUseSSOMock } from '../../__mocks__';

jest.useFakeTimers(); // Use fake timers to control setTimeout

// Test suite for RefreshExpiryDialog component
describe('RefreshExpiryDialog', () => {
  beforeEach(() => {
    resetUseSSOMock(); // Reset the useSSO mock to clear any set behavior
    jest.clearAllMocks();

    // Setup default mock behavior for useSSO
    mockUseSSO.mockImplementation(() =>
      createUseSSOMock({
        isAuthenticated: false,
      }),
    );
  });

  // Test case: renders nothing when isVisible is false
  it('does not render when isVisible is false', () => {
    const { container } = render(<RefreshExpiryDialog isVisible={false} />);
    expect(container.firstChild).toBeNull();
  });

  // Test case: renders correctly with initial state when isVisible is true
  it('renders correctly with initial state when isVisible is true', () => {
    render(<RefreshExpiryDialog isVisible={true} />);
    expect(screen.getByText('Your login session is about to expire.')).toBeInTheDocument();
    expect(screen.getByText('STAY LOGGED IN')).toBeInTheDocument();
  });

  // Test case: updates the message and button text 15 seconds after visible
  it('updates the message and button text after 15 seconds', () => {
    render(<RefreshExpiryDialog isVisible={true} />);

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    expect(screen.getByText('Your login session has expired.')).toBeInTheDocument();
    expect(screen.getByText('LOG IN AGAIN')).toBeInTheDocument();
  });
});
