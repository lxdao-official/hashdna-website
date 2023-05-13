import React from 'react';
import Layout from '@/components/Layout';
import SectionHero from '@/sections/SectionHomepageHero';
import SectionSteer from '@/sections/SectionSteer';
import SectionWorkingGroup from '@/sections/SectionWorkingGroup';


export default function Home() {
    return (
        <Layout>
            <SectionHero />
            <SectionWorkingGroup />
            <SectionSteer/>
        </Layout>
    );
}

