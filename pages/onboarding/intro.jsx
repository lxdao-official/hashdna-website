/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from '@mui/material';
/*
* 导入了 Material-UI 库中的 Container、Typography、Card、CardMedia、CardContent 和 Box 组件，以及自定义组件 Layout、LXButton、OnBoardingBottom 和 OnBoardingLayout。
定义了一个包含多个对象的数组 data，每个对象包含一个图标、一个标题和一段说明内容。
在组件的渲染内容中，使用 OnBoardingLayout 组件作为页面布局，设置了标题、描述和下一步按钮。
在 OnBoardingLayout 组件的主体内容中，使用 Box 组件创建了一个区域，用于显示每个对象的图标、标题和说明内容。
使用 map 方法遍历 data 数组的每个元素，将其渲染为一个 Card 组件。
在 Card 组件中使用 CardContent 组件包装图标、标题和说明内容，并使用 Typography 组件分别显示它们的内容。
在标题下方添加了一个由 Box 组件创建的蓝色条形块，用于起到视觉分隔的作用。
最后导出该组件默认值。
* */
import Layout from '@/components/Layout';
import LXButton from '@/components/Button';
import OnBoardingBottom from '@/components/OnBoardingBottom';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import { maxWidth } from '@mui/system';

export default function Intro() {
  const data = [
    {
      svg: '/icons/mission.svg',
      title: 'MISSION',
      content: `LXDAO is an R&D-focused DAO in Web3. Our mission is gathering the power of buidlers to buidl and support “LX” (valuable) Web3 projects sustainably and welcome 1 billion users into Web3.`,
    },
    {
      svg: '/icons/Vision.svg',
      title: 'VISION',
      content: `Our Vision & Consensus - The technologies, concepts and ideas of Web3 will be used by a billion people in a decade.`,
    },
    {
      svg: '/icons/value.svg',
      title: 'VALUE',
      content: `LX = 良心 = Conscience`,
    },
  ];
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="LXDAO INTRODUCTION"
      next="/onboarding/flow"
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-between' },
          mb: { xs: '30px', md: '53px' },
          mt: { xs: '40px', md: '70px' },
          px: 0,
        }}
      >
        {data.map((value, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: 300, lg: 389 },
              height: 460,
              marginBottom: '20px',
              border: '0.5px solid #D0D5DD',
              borderRadius: '6px',
              position: 'relative',
            }}
          >
            <CardContent sx={{ paddingTop: '77px', paddingX: '19px' }}>
              <Box component={'img'} src={value.svg} height="92px" />

              <Typography
                mt="77px"
                sx={{
                  fontWeight: 800,
                  position: 'relative',
                }}
                variant="subtitle1"
                component="div"
              >
                {value.title}
                <Box
                  component={'div'}
                  mt="16px"
                  sx={{
                    width: 99,
                    height: 12,
                    backgroundColor: '#36AFF9',
                    opacity: 0.6,
                    position: 'absolute',
                    bottom: '7px',
                  }}
                ></Box>
              </Typography>
              <Typography mt="27px" variant="body2" color="text.secondary">
                {value.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </OnBoardingLayout>
  );
}
