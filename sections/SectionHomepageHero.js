import React from 'react';
import styled, { keyframes } from 'styled-components';
import {Box, Typography} from '@mui/material';
import Container from '@/components/Container';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import DownloadButton from '@/components/Download';


import { t } from '@lingui/macro';


const GlowingCircle = styled(Box)`
  position: absolute;
  width: 346.72px;
  height: 310.98px;
  left: 830px;
  top: -100px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom right, #3fcaff, #2be485);
  opacity: 1;
  filter: blur(180px);
  z-index: -2;
`;


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
  font-size: 98px;
  line-height: 90px;
  font-weight: 700;
  @media screen and (max-width: 900px) {
    font-size: 4.902rem;
    line-height: 1.02;
  }
  @media screen and (max-width: 600px) {
    font-size: 3.5625rem;
    line-height: 1.02;
  }
`;
/*just solve react 152 */
const SectionHomepageHero = () => {
  const Title = () => {
    const localeLang = localStorage.getItem('locale');
    if (localeLang !== 'zh') {
      return (
          <Box >
            <Box  >
              <Typography
                  variant="h1"
                  lineHeight={{ md: '120px', sm: '50px', xs: '37px' }}
                  fontWeight={700}
              >
                {t`topSection-title-1`}

              </Typography>
              <Typography
                  variant="h1"
                  lineHeight={{ md: '120px', sm: '37px', xs: '37px' }}
                  fontWeight={700}
              >
                {t`topSection-title-2`}
                <HightlightText>{t`topSection-title-3`}</HightlightText>
                {t`topSection-title-4`}
              </Typography>
            </Box>
          </Box>
      );
    } else if (localeLang === 'zh') {
      return (
          <Box >
            <Box  >
            {/*<Box width={1318} high={120} >*/}
              <Typography
                  variant="h1"
                  lineHeight={{ md: '120px', sm: '37px', xs: '37px' }}
                  fontWeight={600}

              >
                  {t`topSection-title-1`}
                  <HightlightText>{t`topSection-title-3`}</HightlightText>
                  {t`topSection-title-4`}
              </Typography>
            </Box>
          </Box>
      );
    }

  };
  return (
    <Container
      minHeight={{ md: '1000px', xs: '660px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
     /* justifyContent="flex-start"*/
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
      style={{ paddingTop: '112px' }}

    >
      <Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={6}
        alignItems="center"
        textAlign="center"

      >
        <Title />
        <Box display={{ md: 'block', sm: 'none', xs: 'none' }}>
          <Typography variant="subtitle1" lineHeight="36px" color="#667085">
            {t`Make NFT creation easy,`}
          </Typography>
          <Typography variant="subtitle1" lineHeight="36px" color="#667085">
            {t`allowing artists to focus on creation`}
          </Typography>
        </Box>
        <DownloadButton/>
        <CommunityLinkGroup />

        </Box>


        <Box position="relative">
          <GlowingCircle />
          <Box zIndex={-1} display={{ md: 'block', sm: 'none', xs: 'none' }} component='img' src='/images/idea.png' ></Box>
        </Box>


      </Box>

    </Container>




  );
};

export default SectionHomepageHero;
