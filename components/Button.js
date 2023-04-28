import React from 'react';
import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Button = ({ variant, children, ...rest }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      cursor: 'pointer',
      '&:hover': {
        backgroundColor:
          variant === 'outlined' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.8)',
      },
      color: variant === 'outlined' ? rest.color || '#000000' : '#ffffff',
      borderRadius: '6px',
      border: variant === 'outlined' ? '1px solid #D0D5DD' : 'none',
      outline: 'none',
      padding: '12px 20px',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
      background:
        variant === 'outlined'
          ? '#ffffff'
          : variant === 'gradient'
          ? rest.disabled
            ? 'linear-gradient(89.57deg, rgba(41,117,223,0.5) 0.27%, rgba(58,207,227,0.5) 105.82%)'
            : 'linear-gradient(90deg, #23FF69FF 0%, #7FACFFFF 100%)'
          : '#000000',
      pointerEvents: rest.disabled ? 'none' : 'auto',
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default Button;
