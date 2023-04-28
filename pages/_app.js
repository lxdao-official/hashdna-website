import React from 'react';
import { useEffect } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { ThemeProvider } from '@mui/material/styles';


import getTheme from '@/common/theme';
import { AlertProvider } from '@/context/AlertContext';

import AlertPopup from '@/components/AlertPopup';
import { activatei18n } from '../i18n';

import '@/common/style.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const localeLang = localStorage.getItem('locale');
        const navigatorLang = navigator.language || navigator.userLanguage;
        const navigatorLanguage = navigatorLang.substr(0, 2);
        activatei18n(
            localeLang ? localeLang : navigatorLanguage === 'zh' ? 'zh' : 'en'
        );
    }, []);
  return (
    <ThemeProvider theme={getTheme('light')}>
      <AlertProvider>
          <I18nProvider i18n={i18n}>
            <Component {...pageProps} />
              <AlertPopup />
          </I18nProvider>


      </AlertProvider>
    </ThemeProvider>
  );
}

export default MyApp;
