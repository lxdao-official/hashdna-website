import React from 'react';
import { Box } from '@mui/material';
/*
* 这是一个React函数组件，名为"Tag"，它引入了Box等Material-UI库的组件。
* 该组件用于显示一个标签，包含文本内容和自定义的样式属性。
* 在渲染过程中，该组件会根据传递的props来设置标签的文本内容、背景颜色、字体颜色、字号大小以及圆角等样式，
* 并使用Box组件来呈现标签的样式。最终，这个组件通过export default语句进行导出，以便其他文件可以使用它。
*
* */
function Tag(props) {
  return (
    <Box
      sx={{
        borderRadius: '2px',
        padding: '2px 6px',
        marginRight: '8px',
        marginBottom: '4px',
        wordBreak: 'break-all',
        background: props.background || 'rgba(102,111,133,0.1)',
        color: props.color || '#666F85',
        fontSize: '14px',
      }}
    >
      {props.text}
    </Box>
  );
}

export default Tag;
