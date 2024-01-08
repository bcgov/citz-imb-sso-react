import React, { useReducer, useState } from "react";
import { KeycloakProviderProps } from "../types";
import { initialState, reducer } from "../state/reducer";
import { KeycloakWrapper } from "./Wrapper";
import { RefreshExpiryDialog } from "./RefreshExpiryDialog";
import { AuthContext } from "../context";

/**
 * Provides a keycloak authentication context to its children.
 * @param {KeycloakProviderProps} props
 * @property {ReactNode} props.children - The children components to be wrapped with the authentication context.
 * @property {string} props.backendURL - (optional) Specify backend api url, default = '/api'.
 * @property {IdentityProvider} props.idpHint - (optional) Identity provider to improve login.
 * @property {Function} props.onRefreshExpiry - (optional) Function to call when refresh token expires.
 */
export const KeycloakProvider = (props: KeycloakProviderProps) => {
  const { children, backendURL, idpHint, onRefreshExpiry } = props;
  const [isExpiryDialogVisible, setIsExpiryDialogVisible] = useState(false);

  // Initialize the authentication state and dispatch function using the reducer.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <KeycloakWrapper
        backendURL={backendURL}
        onRefreshExpiry={
          onRefreshExpiry
            ? () => onRefreshExpiry()
            : () => setIsExpiryDialogVisible(true)
        }
      >
        {children}
      </KeycloakWrapper>
      <RefreshExpiryDialog
        loginProps={{ backendURL, idpHint }}
        isVisible={isExpiryDialogVisible}
      />
    </AuthContext.Provider>
  );
};
