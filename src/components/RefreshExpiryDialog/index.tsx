import './styles.css';
import React from 'react';
import { RefreshExpiryDialogProps } from '../../types';
import { useSSO } from '../../state/useSSO';

export const RefreshExpiryDialog = (props: RefreshExpiryDialogProps) => {
  const { isVisible, loginProps } = props;
  const { login } = useSSO();

  if (!isVisible) return null;

  return (
    <>
      <div className="ssor_dialog-overlay" />
      <dialog className="ssor_dialog" open={isVisible}>
        <div className="ssor_dialog-content">
          <p className="ssor_dialog-message">Your login session has expired.</p>
          <button className="ssor_button" onClick={() => login(loginProps)}>
            Log in again
          </button>
        </div>
      </dialog>
    </>
  );
};
