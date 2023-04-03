import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box} from '@mui/material';

import DownloadButton from '@/components/Download';

const Header = () => {

  const router = useRouter();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={{ md: '128px', sm: '120px', xs: '120px' }}
        maxWidth="1216px"
        marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
      >
        <Box
          onClick={() => {
            router.push('/');
          }}
          sx={{ cursor: 'pointer' }}
          display="flex"
        >
          <Box
            width={{ md: '120px', sm: '120px', xs: '80px' }}
            component={'img'}
            src={'/icons/hashdna-logo.png'}
          />

        </Box>

        <Box display="flex" gap="40px">
          {/*<Language/>*/}
          <DownloadButton/>

        </Box>


      </Box>
    </>
  );
};

export default Header;
