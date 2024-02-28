import { Context, createContext } from 'react';
import { AuthStateWithDispatch } from './types';
import { initialState } from './state/reducer';

// Create an initial context with initialState.
export const AuthContext: Context<AuthStateWithDispatch> = createContext<AuthStateWithDispatch>({
  state: initialState,
  dispatch: () => {},
});
