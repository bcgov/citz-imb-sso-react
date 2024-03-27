import { useContext, useMemo } from 'react';
import { AuthContext } from '../context';
import { decodeJWT, hasAllRoles, hasAtLeastOneRole, normalizeUser } from '../utils';
import { AuthService, HasRolesOptions, LoginProps } from '../types';
import { AuthActionType } from './reducer';

const { ATTEMPT_LOGIN, LOGOUT, UNAUTHORIZED, REFRESH_TOKEN } = AuthActionType;

/**
 * A custom hook that provides authentication-related functionality to other components.
 * @returns {AuthService} - An object containing authentication-related functions
 * and the current authentication state.
 */
export const useSSO = (): AuthService => {
  const { state, dispatch } = useContext(AuthContext);

  // Use useMemo to memoize the returned object and prevent unnecessary re-renders.
  return useMemo(() => {
    // Return Authorization Header value for SSO requests.
    const getAuthorizationHeaderValue = () => `Bearer ${state.accessToken}`;

    // Return a wrapper for the Node Fetch API with authorization header set.
    const fetchProtectedRoute = (url: string, options: RequestInit = {}) => {
      options.headers['Authorization'] = getAuthorizationHeaderValue();
      return fetch(url, options);
    };

    // Return true if the user has the specified role.
    const hasRoles = (roles: string[], options?: HasRolesOptions) => {
      const userRoles = state.userInfo?.client_roles;

      // Ensure proper use of function.
      if (!roles || !Array.isArray(roles) || !roles.every((item) => typeof item === 'string'))
        throw new Error(
          'Error: hasRoles function of `citz-imb-sso-react`. Pass roles as an array of strings.',
        );

      // Return false because user does not have any roles
      if (!userRoles) return false;

      // User must have all roles in roles array unless requireAllRoles === false
      if (options && options?.requireAllRoles === false) return hasAtLeastOneRole(userRoles, roles);
      else return hasAllRoles(userRoles, roles);
    };

    // Is the user authenticated
    const isAuthenticated = Boolean(state?.isAuthenticated);
    const isLoggingIn = Boolean(state?.isLoggingIn);

    const login = (props?: LoginProps) => {
      const { backendURL = '/api', idpHint } = props ?? {};
      dispatch({ type: ATTEMPT_LOGIN });

      // Redirect to login route.
      window.location.href = `${backendURL}/auth/login${idpHint ? `?idp=${idpHint}` : ''}`;
    };

    const logout = (backendURL?: string) => {
      dispatch({ type: LOGOUT });

      // Redirect to logout route.
      window.location.href = `${backendURL ?? '/api'}/auth/logout?id_token=${state?.idToken}`;
    };

    // Normalize user info
    const user = state?.userInfo ? normalizeUser(state.userInfo) : undefined;

    // Get a new access token using the refresh token.
    const refreshToken = async (backendURL?: string) => {
      const url = `${backendURL ?? '/api'}/auth/token`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
        });

        // Exit if response isn't 200.
        if (!response.ok) {
          if (response.status === 401) dispatch({ type: UNAUTHORIZED });
          return;
        }

        // Get tokens.
        const data = await response.json();
        if (!data) return;

        const { access_token, id_token, expires_in } = data;
        if (!access_token || !id_token || !expires_in) return;

        const userInfo = decodeJWT(access_token);

        dispatch({
          type: REFRESH_TOKEN,
          payload: { accessToken: access_token, idToken: id_token, userInfo },
        });

        // Re-call refreshToken 15 seconds before expiry.
        setTimeout(() => refreshToken(), (expires_in - 15) * 1000);
      } catch (error) {
        // Do not console log because error will occur on first load when user has not logged in yet.
      }
    };

    return {
      getAuthorizationHeaderValue,
      fetchProtectedRoute,
      hasRoles,
      login,
      logout,
      refreshToken,
      state,
      isAuthenticated,
      isLoggingIn,
      user,
    };
  }, [state]);
};
