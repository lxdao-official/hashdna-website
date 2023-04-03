import React from 'react';
import { useEffect } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { ThemeProvider } from '@mui/material/styles';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import getTheme from '@/common/theme';
import { AlertProvider } from '@/context/AlertContext';
import { wagmiClient, chains } from '@/components/ConnectWallet';
import AlertPopup from '@/components/AlertPopup';
/*
*
* 在JavaScript中，通常使用下划线来表示私有字段或函数。
* 这意味着它是不应该被外部代码访问或调用的，
* 因为它们可能会发生变化或被删除。
* 在这个示例中，@/common/theme.js模块中
* 可能会定义一个名为_getTheme的私有函数，并且在此文件中可以使用它，
* 但是外部代码无法直接访问或调用它。
* */
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '@/common/style.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const localeLang = localStorage.getItem('locale');
        const navigatorLang = navigator.language || navigator.userLanguage;
        const navigatorLanguage = navigatorLang.substr(0, 2);
        /*activatei18n(
            localeLang ? localeLang : navigatorLanguage === 'zh' ? 'zh' : 'en'
        );*/
    }, []);
  return (
    <ThemeProvider theme={getTheme('light')}>
      <AlertProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            theme={lightTheme({
              borderRadius: 'small',
              accentColor: 'linear-gradient(90deg, #305FE8 0%, #3AD9E3 100%)',
            })}
            chains={chains}
          >
            <Component {...pageProps} />
            <AlertPopup />
          </RainbowKitProvider>
        </WagmiConfig>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default MyApp;
