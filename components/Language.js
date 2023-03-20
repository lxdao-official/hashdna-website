import React from 'react';
import { activatei18n } from '../i18n';
import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
/*
* 这段代码实现了一个名为 Language 的React组件，用于在应用程序中创建一个带有语言选择菜单的语言切换器。该组件使用了 localStorage 以及 i18n 库来持久化存储用户所选语言，并且在不同语言之间进行切换时会重新加载相应的翻译资源。

在组件内部，使用 useState 钩子来管理状态变量，包括 anchorEl、localeLang、navigatorLang 和 lang。其中，localeLang 存储上一次用户选择的语言，navigatorLang 存储浏览器默认的语言设置（如果有的话），lang 存储当前选择的语言。使用 useState 钩子函数还提供了处理菜单的打开和关闭状态的逻辑，通过 handleClick 和 handleClose 函数分别与按钮和菜单相关联。

在 setLanguage 函数中，用于更新 lang 变量并调用 activatei18n 函数来更新翻译资源。同时，也将用户所选语言保存到 localStorage 中，以便下次访问时自动加载所选语言。

最后，在回调函数 useCallback 中定义了 LangNode 组件，该组件返回一个带有语言选择菜单的按钮。当用户选择某个语言时，会调用 handleLangSelect 函数进行更新，并将所选语言传递给 setLanguage 函数。此外，还包含一个提示菜单项，用于提示用户如何联系开发人员以添加更多语言支持。

要使用 Language 组件，请将其导入并将其放置在应用程序的适当位置。例如在主页或者侧边栏等地方。
*
* */
const Language = () => {
  const localeLang = localStorage.getItem('locale');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigatorLang = navigator.language || navigator.userLanguage;
  const navigatorLanguage = navigatorLang.substr(0, 2);
  const [lang, setLang] = useState(
    localeLang ? localeLang : navigatorLanguage === 'zh' ? 'zh' : 'en'
  );

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setLanguage = (value) => {
    setLang(value);
    activatei18n(value);
    localStorage.setItem('locale', value);
  };

  const handleLangSelect = (value) => {
    setLanguage(value);
  };

  const LangNode = useCallback(() => {
    return (
      <Box marginLeft="auto">
        <Button
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Box display="flex">
            <TranslateIcon />
            <Typography marginLeft={0.5}>
              {lang === 'zh' ? '简体中文' : 'English'}
            </Typography>
          </Box>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            dense: true,
          }}
        >
          <MenuItem onClick={() => handleLangSelect('en')}>
            <Typography variant="subtitle1">English</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleLangSelect('zh')}>
            <Typography variant="subtitle1">简体中文</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              alert(
                'If you want to translate to your native language, please contact us on Discord.'
              );
            }}
          >
            <Typography variant="subtitle1">Your Lang?</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }, [lang, anchorEl]);
  return LangNode();
};

export default Language;
