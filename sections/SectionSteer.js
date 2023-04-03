import React from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import { Box, Typography, Link } from '@mui/material';
import Container from '@/components/Container';

const textColorGradient = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const HightlightText = styled.span`
  background-size: 400% 400%;
  background-image: linear-gradient(to right, #c3ff36, #23ff69, #7facff);
  -webkit-background-clip: text;
  animation: ${textColorGradient} 10s ease infinite;
  color: transparent;
  font-size: 64px;
  line-height: 90px;
  font-weight: 800;
  @media screen and (max-width: 900px) {
    font-size: 4.902rem;
    line-height: 1.02;
  }
  @media screen and (max-width: 600px) {
    font-size: 3.5625rem;
    line-height: 1.02;
  }
`;

const SectionHomepageHero = () => {
  const router = useRouter();
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
            VIEW TUTORIAL VIDEO
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
