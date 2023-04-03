import React from 'react';
import { Typography, Box, Link, Grid } from '@mui/material';
/*
* 这段代码是一个 React 组件，名为 WorkingGroupCard，它包含以下功能：

使用了 Material-UI 库中的 Typography、Box、Link 和 Grid 组件。
接收一个 props 对象作为参数，其中包括 image、name、link 和 hasBorder 四个属性。
在组件的内部，使用 Grid 组件设置了卡片的布局，包括 xs、sm、md、lg 四个屏幕尺寸下的列数。
使用 Link 组件包装整个卡片，并将链接地址设置为传入的 link 属性值。同时设置了链接样式。
内部使用 Box 组件创建了卡片的顶部图片区域，并通过 sx 属性设置了该区域的背景颜色、高度、对齐方式、边框样式等。
在图片区域内使用 Box 组件显示了传入的 image 属性值对应的图片。
使用 Typography 组件创建了卡片的底部名称区域，并通过 sx 属性设置了该区域的背景颜色、字体大小、行高、字重、内边距、边框样式等。
在卡片底部名称区域内显示了传入的 name 属性值。
最终将整个卡片以 JSX 的形式渲染出来，包含图片区域和名称区域两部分。
* */
const WorkingGroupCard = ({ image, name, link, hasBorder }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Link href={link} sx={{ textDecoration: 'none' }} target="_blank">
        <Box
          backgroundColor="#F5F5F5"
          height="160px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px 6px 0 0"
          sx={{ border: `${hasBorder ? ' 0.5px solid #D0D5DD' : 'none'}` }}
        >
          <Box component="img" src={image} />
        </Box>
        <Typography
          variant="body1"
          lineHeight="19px"
          fontWeight={600}
          backgroundColor="#ffffff"
          padding="20px 24px"
          borderRadius="0 0 6px 6px"
          sx={{ border: `${hasBorder ? ' 0.5px solid #D0D5DD' : 'none'}` }}
        >
          {name}
        </Typography>
      </Link>
    </Grid>
  );
};

export default WorkingGroupCard;
