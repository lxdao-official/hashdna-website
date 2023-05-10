import React from 'react';
import Layout from '@/components/Layout';
import SectionHero from '@/sections/SectionHomepageHero';
import SectionSteer from '@/sections/SectionSteer';
import SectionWorkingGroup from '@/sections/SectionWorkingGroup';
import { Box } from '@mui/material';
import { LXDAOIntroduction } from 'lxdao-ui';

export default function Home() {
    return (
        <Layout>
            <SectionHero />
            <SectionWorkingGroup />
            <SectionSteer/>
            <Box marginBottom={4} paddingX={5}>
                <LXDAOIntroduction maxWidth="1240px" xsWidth="326px" />
            </Box>
        </Layout>
    );
}

