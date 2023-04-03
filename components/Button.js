import React from 'react';
import { Box } from '@mui/material';
/*
*
* 这段代码定义了一个名为 Button 的React组件，用于渲染定制化按钮。该组件接受以下属性：

variant: 按钮的样式变体，可以是 'contained'、'outlined' 或 'gradient'。
children: 按钮中显示内容的React元素。
...rest: 其他HTML属性和事件处理程序。
在组件内部，使用 Box 组件来创建包含按钮文本的容器，并根据属性值设置它的CSS样式。其中，按钮可以是三种样式之一：实心、轮廓线条或渐变。如果按钮处于禁用状态，则应用不同的CSS样式，以反映其禁用状态并防止用户交互。最后，在容器中呈现子元素（即按钮的文本）。

总之，该组件提供了一种简单且易于使用的方法，用于在React应用程序中呈现各种类型的按钮，并允许开发人员定制按钮的外观和行为。
*
* */
// eslint-disable-next-line react/prop-types
const Button = ({ variant, children, ...rest }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      cursor: 'pointer',
      '&:hover': {
        backgroundColor:
          variant === 'outlined' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.8)',
      },
      color: variant === 'outlined' ? rest.color || '#000000' : '#ffffff',
      borderRadius: '6px',
      border: variant === 'outlined' ? '1px solid #D0D5DD' : 'none',
      outline: 'none',
      padding: '12px 20px',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
      background:
        variant === 'outlined'
          ? '#ffffff'
          : variant === 'gradient'
          ? rest.disabled
            ? 'linear-gradient(89.57deg, rgba(41,117,223,0.5) 0.27%, rgba(58,207,227,0.5) 105.82%)'
            : 'linear-gradient(90deg, #23FF69FF 0%, #7FACFFFF 100%)'
          : '#000000',
      pointerEvents: rest.disabled ? 'none' : 'auto',
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default Button;
