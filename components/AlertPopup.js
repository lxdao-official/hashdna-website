import React, { useContext } from 'react';
import Alert from '@mui/material/Alert';
import { AlertContext } from '@/context/AlertContext';
const AlertPopup = () => {
  const useAlert = () => useContext(AlertContext);
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        severity={type}
        variant="filled"
        sx={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          width: '360px',
          marginLeft: '-180px',
          zIndex: 10,
          fontSize: '14px',
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return null;
  }
};

export default AlertPopup;
