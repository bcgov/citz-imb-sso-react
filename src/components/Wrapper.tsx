import React, { useEffect } from 'react';
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

    if (params.has('refresh_expires_in')) {
      // Handle expiring refresh token.
      const refresh_expires_in = Number(params.get('refresh_expires_in'));
      setTimeout(() => onRefreshExpiry(), 1000 * refresh_expires_in);

      // Remove search param.
      params.delete('refresh_expires_in');

      // Update the URL.
      url.search = params.toString();
      window.history.replaceState({}, '', url.toString());
    }

    // Call refreshToken if user is not authenticated.
    if (!isAuthenticated) setTimeout(() => refreshToken(backendURL), 500);
  });

  return <>{children}</>;
};
