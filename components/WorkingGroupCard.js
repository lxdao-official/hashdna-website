import React from 'react';
import { Typography, Box, Link, Grid } from '@mui/material';
const WorkingGroupCard = ({ image, name, link, hasBorder }) => {
  const localeLang = localStorage.getItem('locale');
  if (localeLang !== 'zh') {
    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Link href={link} sx={{ textDecoration: 'none' }} target="_blank">
            <Box
                backgroundColor="#F5F5F5"
                height="160px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="6px 6px 0 0"
                sx={{ border: `${hasBorder ? ' 0.5px solid #D0D5DD' : 'none'}` }}
            >
              <Box component="img" src={image} />
            </Box>
            <Typography
                variant="body1"
                lineHeight="19px"
                fontWeight={600}
                backgroundColor="#ffffff"
                padding="20px 24px"
                borderRadius="0 0 6px 6px"
                sx={{ border: `${hasBorder ? ' 0.5px solid #D0D5DD' : 'none'}` }}
            >
               {name}
            </Typography>
          </Link>
        </Grid>
    );
  } else if (localeLang === 'zh') {
    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Link href={link} sx={{ textDecoration: 'none' }} target="_blank">
            <Box
                backgroundColor="#F5F5F5"
                height="160px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="6px 6px 0 0"
                sx={{ border: `${hasBorder ? ' 0.5px solid #D0D5DD' : 'none'}` }}
            >
              <Box component="img" src={image} />
            </Box>
            <Typography
                variant="body1"
                lineHeight="19px"
                fontWeight={600}
                backgroundColor="#ffffff"
                padding="20px 24px"
                borderRadius="0 0 6px 6px"
                sx={{ border: `${hasBorder ? ' 0.5px solid #D0D5DD' : 'none'}` }}
            >
                {name}

            </Typography>
          </Link>
        </Grid>
    );
  }

};

export default WorkingGroupCard;
