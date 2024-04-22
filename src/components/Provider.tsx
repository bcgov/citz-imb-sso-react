import { useReducer, useState } from 'react';
import { SSOProviderProps } from '../types';
import { initialState, reducer } from '../state/reducer';
import { SSOWrapper } from './Wrapper';
import { RefreshExpiryDialog } from './RefreshExpiryDialog';
import { AuthContext } from '../context';

/**
 * Provides a sso authentication context to its children.
 * @param {SSOProviderProps} props - See properties below.
 * @property {ReactNode} children - The children components to be wrapped with the authentication context.
 * @property {string} [backendURL] - Specify backend api url, default = '/api'.
 * @property {IdentityProvider} [idpHint] - Identity provider to improve login.
 * @property {Function} [onRefreshExpiry] - Function to call when refresh token expires.
 * @property {boolean} [overrideShowRefreshExpiryDialog] - Show RefreshExpiryDialog.
 * @property {string} [postLoginRedirectURL] - Redirect url after login.
 */
export const SSOProvider = (props: SSOProviderProps) => {
  const {
    children,
    backendURL,
    idpHint,
    onRefreshExpiry,
    overrideShowRefreshExpiryDialog,
    postLoginRedirectURL,
  } = props;
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
      <RefreshExpiryDialog
        loginProps={{ backendURL, idpHint, postLoginRedirectURL }}
        isVisible={overrideShowRefreshExpiryDialog ? true : isExpiryDialogVisible}
      />
    </AuthContext.Provider>
  );
};
