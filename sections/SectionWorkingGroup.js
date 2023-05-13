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
  return(
      <Box width="100%"  style={{
          background: "linear-gradient(to right, #24E77B 0%, #80BAFF 100%)",
      }}>

      <Container paddingY={{ md: '97px', xs: 8 }} >

          <Typography paddingY={{ md: '15px', xs: 8 }} margin="0 auto"
                      variant="h6"
                      lineHeight="7px"
                      fontWeight="200"
                      color="#ffffff"
                      marginBottom={9}
                      style={{marginBottom:99,marginTop:32}}
          >
              {t`Our Adavantages`}
          </Typography>

         <Box style={{ width: '1216px', height: '140px', marginBottom:49}}>

             <Typography
                 variant="h3"
                 lineHeight="38px"
                 fontWeight="500"
                 color="#ffffff"
                 marginBottom={2}
             >
                 {t`Make NFT simple,`}

             </Typography>
             <Typography
                 variant="h3"
                 lineHeight="38px"
                 fontWeight="500"
                 color="#ffffff"
                 marginBottom={12}
             >

                 {t`artists can easily handle it`}
             </Typography>
         </Box>



          <Grid container spacing={3}>
              {workingGroupsData.length > 0 &&
              workingGroupsData.map((group, index) => {
                  return <WorkingGroupCard  key={index} {...group} />;
              })}
          </Grid>
      </Container>
  </Box>);
}

export default SectionWorkingGroup;

