import { useEffect } from 'react';
import { useSSO } from '../state/useSSO';
import { SSOWrapperProps } from '../types';

export const SSOWrapper = (props: SSOWrapperProps) => {
  const { children, backendURL, onRefreshExpiry = () => {} } = props;

  const { refreshToken, isAuthenticated } = useSSO();

  // Initialize token and userInfo state after login or refresh.
  useEffect(() => {
    // Parse the current URL.
    const url = new URL(window.location.href);
    // Work with query parameters.
    const params = new URLSearchParams(url.search);

    if (params.has('refresh_expires_in') && params.has('post_login_redirect_url')) {
      // Handle expiring refresh token.
      const refresh_expires_in = Number(params.get('refresh_expires_in'));
      setTimeout(() => onRefreshExpiry(), 1000 * refresh_expires_in);

      console.info('SSO React: Retrieving user details.');

      // Redirect url.
      const post_login_redirect_url = params.get('post_login_redirect_url');

      // Update the URL.
      if (post_login_redirect_url?.startsWith('/')) {
        // Relative path.
        const newUrl = `${url.origin}${post_login_redirect_url}`;
        window.location.href = newUrl;
      } else {
        // Absolute path.
        window.location.href = `${post_login_redirect_url}`;
      }
    } else {
      // Call refreshToken if user is not authenticated.
      if (!isAuthenticated) setTimeout(() => refreshToken(backendURL), 500);
    }
  }, []);

  return <>{children}</>;
};
