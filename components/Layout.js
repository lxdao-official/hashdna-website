/* eslint-disable no-undef */
import React from 'react';
import Head from 'next/head';
import { Box, CssBaseline } from '@mui/material';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// eslint-disable-next-line react/prop-types
export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/icons/hashdna.svg" />
        <title>{title || 'HasnDNA'}</title>
        <meta name="description" content="HashDNA " />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:title" content={title || 'LXDAO Official Website'} />
        <meta
          property="og:description"
          content={
            description ||
            'HashDNA is an R&D-focused DAO in Web3. Focus on supporting valuable Web3 Public Goods and Open Source sustainably. Gather the power of buidlers to buidl and support “LX” (valuable) Web3 projects sustainably and welcome 1 billion users into Web3.'
          }
        />
        <meta property="og:url" content="https://lxdao.io/" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>

      <CssBaseline />
      <Box>
        <Header />
        <Box minHeight={'100vh'}>{children}</Box>
        <div data-donate3-cid="bafkreigyrhetgqaw6gqdn57b5agommkeg6u7bto64qxodn6zxchyq3qomu"></div>
        <Footer />
      </Box>
    </>
  );
}
