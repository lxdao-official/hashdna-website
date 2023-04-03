import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Typography, Link } from '@mui/material';

import API from '@/common/API';

import Container from '@/components/Container';
import Button from '@/components/Button';
import StyledTooltip from '@/components/StyledToolTip';
import Tag from '@/components/Tag';
import Skills from '@/components/Skills';

const BuidlerAvatarBox = ({ buidler, active, display }) => {
  return (
    <Link
      href={`/buidlers/${buidler.address}`}
      target="_blank"
      sx={{
        textDecoration: 'none',
        aspectRatio: '1 / 1',
      }}
      display={display}
      width={{ lg: '180px', sm: '130px', xs: '130px' }}
      height={{ lg: '180px', sm: '130px', xs: '130px' }}
      position="relative"
    >
      <Box
        width={{ lg: '180px', sm: '130px', xs: '100%' }}
        sx={{ position: 'absolute', top: 0, left: 0, aspectRatio: '1 / 1' }}
        backgroundColor={active ? 'transpent' : 'rgba(0,0,0,0.2)'}
        display={{ md: 'block', xs: 'none' }}
      />

      <Box
        component="img"
        src={buidler.avatar || '/images/placeholder.jpeg'}
        width={{ lg: '180px', sm: '130px', xs: '100%' }}
        sx={{ aspectRatio: '1 / 1' }}
      />
    </Link>
  );
};

const BudilerTooltip = ({
  buidler,
  active,
  handleBuidlerCardHover,
  handleBuidlerCardLeave,
  ...rest
}) => {
  const BuidlerDetails = ({ name, description, address, role, skills }) => {
    return (
      <Box>
        <Typography
          color="#000000"
          variant="h5"
          lineHeight="24px"
          fontWeight={500}
          marginBottom={3}
        >
          {name}
        </Typography>
        <Typography
          color="#666F85"
          variant="body1"
          lineHeight="24px"
          fontWeight={400}
          marginBottom="17px"
        >
          {description}
        </Typography>
        {role?.length && (
          <Box display="flex" flexWrap="wrap" marginBottom="25px">
            {role.map((roleItem, index) => {
              return <Tag key={index} text={roleItem} />;
            })}
          </Box>
        )}
        {skills?.length && (
          <>
            <Typography
              variant="body1"
              color="#101828"
              lineHeight="24px"
              fontWeight={500}
              marginBottom="17px"
            >
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" marginBottom={3}>
              <Skills skills={skills} />
            </Box>
          </>
        )}
        <Link
          href={`/buidlers/${address}`}
          sx={{ textDecoration: 'none' }}
          target="_blank"
        >
          <Typography
            color="#101828"
            variant="body1"
            lineHeight="24px"
            fontWeight={500}
            textAlign="right"
          >
            More ->
          </Typography>
        </Link>
      </Box>
    );
  };

  return (
    <Box {...rest}>
      <StyledTooltip
        title={<BuidlerDetails {...buidler} />}
        placement="bottom-start"
      >
        <Box
          sx={{ aspectRatio: '1 / 1' }}
          onMouseOver={handleBuidlerCardHover}
          onMouseLeave={handleBuidlerCardLeave}
          position="relative"
        >
          <BuidlerAvatarBox buidler={buidler} active={active} display="block" />
        </Box>
      </StyledTooltip>
    </Box>
  );
};

const SectionBuidlers = ({ buidlers }) => {
  const [activeBuidlerIndex, setActiveBuidlerIndex] = useState(null);
  const router = useRouter();

  const handleBuidlerHover = (index) => {
    setActiveBuidlerIndex(index);
  };

  const handleBuidlerLeave = () => {
    setActiveBuidlerIndex(null);
  };

  return (
    <Box backgroundColor="#000000" boxSizing="border-box">
      <Container paddingY={{ md: '112px', xs: 8 }}>
        <Typography
          variant="h2"
          lineHeight="44px"
          fontWeight={600}
          color="#ffffff"
          marginBottom={3}
        >
          LXDAO BUIDLERS
        </Typography>
        <Typography
          variant="subtitle1"
          lineHeight="30px"
          fontWeight={400}
          color="#ffffff"
          marginBottom={{ md: '102px', xs: '72px' }}
        >
          Welcome to Join Us, let's buidl more valuable Web3 products together!
        </Typography>
        <Box display="flex" flexWrap="wrap" width={{ sm: '100%', xs: '100%' }}>
          {buidlers.map((buidler, index) => {
            return (
              <Box key={index}>
                <BudilerTooltip
                  handleBuidlerCardHover={() => {
                    handleBuidlerHover(index);
                  }}
                  handleBuidlerCardLeave={() => {
                    handleBuidlerLeave(index);
                  }}
                  buidler={buidler}
                  active={activeBuidlerIndex === index}
                  display={{ md: 'block', xs: 'none' }}
                />
                <BuidlerAvatarBox
                  buidler={buidler}
                  active={activeBuidlerIndex === index}
                  display={{ md: 'none', xs: 'block' }}
                />
              </Box>
            );
          })}
        </Box>
        <Link
          href={`/joinus`}
          color="#ffffff"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Button
            variant="gradient"
            width="200px"
            marginTop={{ md: '96px', xs: '27px' }}
          >
            Join Us
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default SectionBuidlers;
