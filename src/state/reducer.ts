/* eslint-disable no-unused-vars */
import { AuthAction, AuthState } from '../types';

// Defines the possible types of authentication actions.
export enum AuthActionType {
  LOGOUT = 'LOGOUT',
  ATTEMPT_LOGIN = 'ATTEMPT_LOGIN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

// Initial authentication state.
export const initialState: AuthState = {
  isLoggingIn: false,
  isAuthenticated: false,
  accessToken: undefined,
  idToken: undefined,
  userInfo: undefined,
};

/**
 * Handles authentication actions and returns the updated authentication state.
 * @param {AuthState} state - The current authentication state.
 * @param {AuthAction} action - The authentication action to be handled.
 * @returns {AuthState} - The updated authentication state.
 */
export const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGOUT:
      return initialState;
    case AuthActionType.ATTEMPT_LOGIN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case AuthActionType.REFRESH_TOKEN:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: action.payload?.accessToken,
        idToken: action.payload?.idToken,
        userInfo: action.payload?.userInfo,
      };
    case AuthActionType.UNAUTHORIZED:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      throw new Error('Invalid AuthActionType in Keycloak reducer');
  }
};
