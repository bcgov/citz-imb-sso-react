import './styles.css';
import React, { useEffect, useState } from 'react';
import { RefreshExpiryDialogProps } from '../../types';
import { useSSO } from '../../state/useSSO';

export const RefreshExpiryDialog = (props: RefreshExpiryDialogProps) => {
  const { isVisible, loginProps } = props;
  const { login } = useSSO();

  const [message, setMessage] = useState('Your login session is about to expire.');
  const [buttonText, setButtonText] = useState('STAY LOGGED IN');

  useEffect(() => {
    if (isVisible)
      setTimeout(() => {
        // Change 15 seconds after dialog becomes visible.
        setMessage('Your login session has expired.');
        setButtonText('LOG IN AGAIN');
      }, 15000);
    else {
      // Change when dialog becomes invisible.
      setMessage('Your login session is about to expire.');
      setButtonText('STAY LOGGED IN');
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div className="ssor_dialog-overlay" />
      <dialog className="ssor_dialog" open={isVisible}>
        <div className="ssor_dialog-content">
          <p className="ssor_dialog-message">{message}</p>
          <button className="ssor_button" onClick={() => login(loginProps)}>
            {buttonText}
          </button>
        </div>
      </dialog>
    </>
  );
};
