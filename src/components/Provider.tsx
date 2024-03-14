import React, { useReducer, useState } from 'react';
import { SSOProviderProps } from '../types';
import { initialState, reducer } from '../state/reducer';
import { SSOWrapper } from './Wrapper';
import { RefreshExpiryDialog } from './RefreshExpiryDialog';
import { AuthContext } from '../context';

/**
 * Provides a sso authentication context to its children.
 * @param {SSOProviderProps} props - See properties below.
 * @property {ReactNode} children - The children components to be wrapped with the authentication context.
 * @property {string} backendURL - (optional) Specify backend api url, default = '/api'.
 * @property {IdentityProvider} idpHint - (optional) Identity provider to improve login.
 * @property {Function} onRefreshExpiry - (optional) Function to call when refresh token expires.
 */
export const SSOProvider = (props: SSOProviderProps) => {
  const { children, backendURL, idpHint, onRefreshExpiry } = props;
  const [isExpiryDialogVisible, setIsExpiryDialogVisible] = useState(false);

  // Initialize the authentication state and dispatch function using the reducer.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <SSOWrapper
        backendURL={backendURL}
        onRefreshExpiry={
          onRefreshExpiry ? () => onRefreshExpiry() : () => setIsExpiryDialogVisible(true)
        }
      >
        {children}
      </SSOWrapper>
      <RefreshExpiryDialog loginProps={{ backendURL, idpHint }} isVisible={isExpiryDialogVisible} />
    </AuthContext.Provider>
  );
};
