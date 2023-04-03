import React from 'react';
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
const Container = ({ children, minHeight, ...rest }) => (
  <Box
    minHeight={minHeight}
    maxWidth="1216px"
    boxSizing="border-box"
    marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
