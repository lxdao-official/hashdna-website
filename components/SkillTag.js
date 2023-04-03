import React from 'react';
import { Box, Typography } from '@mui/material';

const levelColors = {
  Junior: 'rgba(54,175,249,0.4)',
  Intermediate: 'rgba(54,175,249,0.7)',
  Senior: '#009FFF',
};
/*
* 这是一个React函数组件，名为"SkillTag"，它引入了Box和Typography等Material-UI库的组件。
* 该组件用于显示一个技能标签，包含技能名称和水平等级，并根据不同的水平等级设置不同的标签背景颜色。
* 在渲染过程中，该组件会根据传递的props来设置标签的文本内容、水平等级以及对应的背景颜色和圆角等样式。
* 最终，这个组件通过export default语句进行导出，以便其他文件可以使用它。
* */


function SkillTag(props) {
  return (
    <Box
      paddingX={1}
      marginRight={1}
      marginTop={1}
      sx={{
        background: levelColors[props.level],
        color: '#fff',
        borderRadius: '2px',
        wordBreak: 'break-all',
      }}
    >
      <Typography fontSize="14px">{props.text}</Typography>
    </Box>
  );
}

export default SkillTag;
