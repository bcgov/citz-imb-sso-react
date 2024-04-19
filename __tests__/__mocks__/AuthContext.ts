import React from 'react';
import { AuthStateWithDispatch } from '@/types';
import { initialState } from '@/state/reducer';

export const mockDispatch = jest.fn();

// Create a mock context with an adjustable state
export const createMockAuthContextValue = (
  stateOverrides: Partial<AuthStateWithDispatch> = {},
) => ({
  state: {
    ...initialState,
    ...stateOverrides.state,
  },
  dispatch: mockDispatch,
});

export const MockAuthContext = React.createContext<AuthStateWithDispatch>(
  createMockAuthContextValue(),
);

// Reset function to clear context states between tests
export const resetMockAuthContext = () => {
  mockDispatch.mockClear();
};
