import React from 'react';
import { Box, Typography} from '@mui/material';
import Container from '@/components/Container';
import { t } from '@lingui/macro';

const SectionHomepageHero = () => {

  const Title = () => {
    return (
      <Box >
        <Box>

          <Box component={'img'} width="125px" src={"/images/codingboy.png"} />
          <Typography
              variant="h3"
              lineHeight={{ md: '68px', sm: '37px', xs: '37px' }}
              fontWeight={800}
          >
            {t`VIEW TUTORIAL VIDEO`}
          </Typography>
        </Box>


      </Box>
    );
  };

  return (
    <Container
      minHeight={{ md: '800px', xs: '660px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
     /* justifyContent="flex-start"*/
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={6}
        alignItems="center"
        textAlign="center"
      >
        <Title />

        <Box display="flex" flexDirection="column" alignItems="center"  borderRadius="10px"
             overflow="hidden">

          <video src="/videos/video.mp4" controls width="640" height="360" />

        </Box>

      </Box>
    </Container>
  );
};

export default SectionHomepageHero;
