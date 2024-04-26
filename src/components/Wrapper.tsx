import { useEffect } from 'react';
import { useSSO } from '../state/useSSO';
import { SSOWrapperProps } from '../types';

export const SSOWrapper = (props: SSOWrapperProps) => {
  const { children, backendURL, onRefreshExpiry = () => {}, refreshExpiresInOffset = 0 } = props;

  const { refreshToken, isAuthenticated } = useSSO();

  // Initialize token and userInfo state after login or refresh.
  useEffect(() => {
    // Parse the current URL.
    const url = new URL(window.location.href);
    // Work with query parameters.
    const params = new URLSearchParams(url.search);

    if (params.has('refresh_expires_in') && params.has('post_login_redirect_url')) {
      // POST LOGIN - refresh_expires_in & post_login_redirect_url are set.
      const post_login_redirect_url = params.get('post_login_redirect_url');
      const refresh_expires_in = Number(params.get('refresh_expires_in'));

      // Update the URL.
      if (post_login_redirect_url?.startsWith('/')) {
        // Relative path.
        const newUrl = `${url.origin}${post_login_redirect_url}?refresh_expires_in=${refresh_expires_in}`;
        window.location.href = newUrl;
      } else {
        // Absolute path.
        window.location.href = `${post_login_redirect_url}?refresh_expires_in=${refresh_expires_in}`;
      }
    } else {
      if (params.has('refresh_expires_in')) {
        // Set timer for expiring refresh token
        const refresh_expires_in = Number(params.get('refresh_expires_in'));

        // Remove search param.
        params.delete('refresh_expires_in');
        url.search = params.toString();
        window.history.replaceState({}, '', url.toString());

        setTimeout(() => onRefreshExpiry(), 1000 * (refresh_expires_in + refreshExpiresInOffset));
      }

      // Call refreshToken if user is not authenticated.
      if (!isAuthenticated) {
        console.info('SSO React: Retrieving user details.');
        refreshToken(backendURL);
      }
    }
  }, []);

  return <>{children}</>;
};
