import React, { useEffect } from "react";
import { useKeycloak } from "./state/useKeycloak";
import { KeycloakWrapperProps } from "./types";

export const KeycloakWrapper = (props: KeycloakWrapperProps) => {
  const { children, backendURL } = props;

  const { refreshToken, state } = useKeycloak();
  const user = state.userInfo;

  // Initialize token and userInfo state after login or refresh.
  useEffect(() => {
    if (!user) setTimeout(() => refreshToken(backendURL), 500);
  });

  return <>{children}</>;
};
