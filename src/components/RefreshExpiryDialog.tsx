import React from "react";
import "./RefreshExpiryDialog.css";
import { LoginProps } from "../types";
import { useKeycloak } from "../state/useKeycloak";

type RefreshExpiryDialogProps = {
  isVisible: boolean;
  loginProps?: LoginProps;
};

export const RefreshExpiryDialog = (props: RefreshExpiryDialogProps) => {
  const { isVisible, loginProps } = props;
  const { login } = useKeycloak();

  if (!isVisible) return null;

  return (
    <>
      <div className="dialog-overlay" />
      <dialog className="dialog" open={isVisible}>
        <div className="dialog-content">
          <p className="dialog-message">Your login session has expired.</p>
          <button onClick={() => login(loginProps)}>RE-LOGIN</button>
        </div>
      </dialog>
    </>
  );
};
