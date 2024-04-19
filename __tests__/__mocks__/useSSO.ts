import { AuthService } from '@/types';

// Function to create a mock AuthService with default or provided values
export const createUseSSOMock = (overrides: Partial<AuthService> = {}): AuthService => ({
  isAuthenticated: false,
  isLoggingIn: false,
  user: undefined,
  login: jest.fn(),
  logout: jest.fn(),
  refreshToken: jest.fn(),
  hasRoles: jest.fn(),
  getAuthorizationHeaderValue: jest.fn(),
  fetchProtectedRoute: jest.fn(),
  state: {
    isAuthenticated: false,
    isLoggingIn: false,
    accessToken: '',
    idToken: '',
    userInfo: undefined,
  },
  ...overrides,
});

export const mockUseSSO = jest.fn(createUseSSOMock);

// Reset function to clear mock states between tests
export const resetUseSSOMock = () => {
  mockUseSSO.mockClear();
  mockUseSSO.mockImplementation(createUseSSOMock);
};
