import { useContext, useMemo } from "react";

import { AuthContext } from "../Provider";
import { decodeJWT } from "../utils";
import { AuthService, LoginProps } from "../types";
import { AuthActionType } from "./reducer";

const { LOGOUT, REFRESH_TOKEN } = AuthActionType;

/**
 * A custom hook that provides authentication-related functionality to other components.
 * @returns {AuthService} - An object containing authentication-related functions
 * and the current authentication state.
 */
export const useKeycloak = (): AuthService => {
  const { state, dispatch } = useContext(AuthContext);

  // Use useMemo to memoize the returned object and prevent unnecessary re-renders.
  return useMemo(() => {
    // Return Authorization Header value for Keycloak requests.
    const getAuthorizationHeaderValue = () => `Bearer ${state.accessToken}`;

    // Return true if the user has the specified role.
    const hasRole = (role: string) =>
      state.userInfo?.client_roles?.includes(role) ?? false;

    const login = (props?: LoginProps) => {
      const { backendURL = "/api", idpHint } = props;

      // Redirect to login route.
      window.location.href = `${backendURL}/auth/login${
        idpHint ? `?idp=${idpHint}` : ""
      }`;
    };

    const logout = (backendURL?: string) => {
      dispatch({ type: LOGOUT });

      // Redirect to logout route.
      window.location.href = `${backendURL ?? "/api"}/auth/logout?id_token=${
        state?.idToken
      }`;
    };

    // Get a new access token using the refresh token.
    const refreshToken = async (backendURL?: string) => {
      const url = `${backendURL ?? "/api"}/auth/token`;

      try {
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
        });

        // Exit if response isn't 200.
        if (!response.ok) return;

        // Get tokens.
        const { access_token, id_token, expires_in } = await response.json();
        if (!access_token || !id_token) return;

        const userInfo = decodeJWT(access_token);

        dispatch({
          type: REFRESH_TOKEN,
          payload: { accessToken: access_token, idToken: id_token, userInfo },
        });

        // Re-call refreshToken 15 seconds before expiry.
        setTimeout(() => refreshToken(), (expires_in - 15) * 1000);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      getAuthorizationHeaderValue,
      hasRole,
      login,
      logout,
      refreshToken,
      state,
    };
  }, [state]);
};
