import React from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import {Box, Typography, Link, Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Card,CardMedia } from '@mui/material';
import Button from '@/components/Button';
import Container from '@/components/Container';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import DownloadButton from '@/components/Download';
import {BackgroundCarousel} from "@/components/BackgroundCarousel";
import ImageCarousel from "@/components/ImageCarousel";
import workingGroupsData from "@/common/content/workingGroups";
import CarouselGroupsData from "@/common/content/CarouselGroups";
import WorkingGroupCard from "@/components/WorkingGroupCard";
// import ActivityNotification from '@/components/ActivityNotification';

import { t } from '@lingui/macro';
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

  const Title = () => {
    return (
      <Box >
        <Box>

          <Typography
              variant="h2"
              lineHeight={{ md: '68px', sm: '37px', xs: '37px' }}
              fontWeight={800}
          >
            {t`LET ARTISTS GENERATE`}

          </Typography>
          <Typography
              variant="h2"
              lineHeight={{ md: '68px', sm: '37px', xs: '37px' }}
              fontWeight={800}
          >
            {t`THEIR OWN`}
            <HightlightText>10000+NFT</HightlightText>
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
        {/*<ImageCarousel/>*/}
      {/*  <Card>
          <CardMedia
              component="img"
              sx={{ width: 800 }}
              image="/images/background-1.jpg"
              alt="Live from space album cover"
          >\</CardMedia>


        </Card>*/}

        </Box>

    </Container>




  );
};

export default SectionHomepageHero;
