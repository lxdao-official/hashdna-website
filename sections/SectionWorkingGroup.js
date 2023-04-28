import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

import Container from '@/components/Container';
import WorkingGroupCard from '@/components/WorkingGroupCard';

import workingGroupsData_en from '@/common/content/workingGroups';
import workingGroupsData_zh from '@/common/content/workingGroups_zh';
import { t } from '@lingui/macro';


const SectionWorkingGroup = () => {
    const localeLang = localStorage.getItem('locale');
    let workingGroupsData = workingGroupsData_en;
    if(localeLang === 'zh'){
        workingGroupsData = workingGroupsData_zh;
    }
  return(<Box width="100%" backgroundColor="#4dcc9e">

      <Container paddingY={{ md: '52px', xs: 8 }} margin="0 auto">

          <Typography paddingY={{ md: '15px', xs: 8 }} margin="0 auto"
                      variant="h6"
                      lineHeight="8px"
                      fontWeight="200"
                      color="#ffffff"
                      marginBottom={8}
          >
              {t`Our Adavantages`}
          </Typography>

          <Typography
              variant="h3"
              lineHeight="38px"
              fontWeight="600"
              color="#ffffff"
              marginBottom={8}
          >
              {t`Make NFT simple,`}
          </Typography><Typography
          variant="h3"
          lineHeight="38px"
          fontWeight="600"
          color="#ffffff"
          marginBottom={8}
      >
          {t`artists can easily handle it`}
      </Typography>


          <Grid container spacing={2}>
              {workingGroupsData.length > 0 &&
              workingGroupsData.map((group, index) => {
                  return <WorkingGroupCard  key={index} {...group} />;
              })}
          </Grid>
      </Container>
  </Box>);
}

export default SectionWorkingGroup;

