import React, { Context, createContext, useReducer } from "react";
import { AuthStateWithDispatch, KeycloakProviderProps } from "./types";
import { initialState, reducer } from "./state/reducer";
import { KeycloakWrapper } from "./Wrapper";

// Create an initial context with initialState.
export const AuthContext: Context<AuthStateWithDispatch> =
  createContext<AuthStateWithDispatch>({
    state: initialState,
    dispatch: () => {},
  });

/**
 * Provides a keycloak authentication context to its children.
 * @param {KeycloakProviderProps} props
 * @property {ReactNode} props.children - The children components to be wrapped with the authentication context.
 * @property {string} props.backendURL - (optional) Specify backend api url, default = '/api'.
 */
export const KeycloakProvider = (props: KeycloakProviderProps) => {
  const { children, backendURL } = props;

  // Initialize the authentication state and dispatch function using the reducer.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <KeycloakWrapper backendURL={backendURL}>{children}</KeycloakWrapper>
    </AuthContext.Provider>
  );
};
