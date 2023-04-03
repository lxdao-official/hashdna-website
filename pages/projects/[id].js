/* eslint-disable no-undef */
import React from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import SectionProjectDetail from '@/sections/SectionProjectDetail';

export default function Home() {
  const router = useRouter();
  const projectId = router.query.id;

  if (!projectId) return null;

  return (
    <Layout title={'LXDAO Project: ' + projectId + ' | LXDAO'}>
      <SectionProjectDetail projectId={projectId} />
    </Layout>
  );
}
