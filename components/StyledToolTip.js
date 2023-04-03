import React from 'react';
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@mui/material';
/*
* 这是一个React函数组件，名为"StyledToolTip"，它引入了makeStyles和Tooltip等Material-UI库的组件。
* 该组件用于自定义Tooltip（提示框）组件的样式，以便在渲染过程中应用这些样式。在渲染过程中，该组件使用useStyles钩子函数创建一个classes对象，
* 包含自定义的样式规则；然后将tooltip类别的样式设置为该对象中定义的值，并将其应用到Tooltip组件上。

最终，这个组件通过export default语句进行导出，以便其他文件可以使用它。
* */
const useStyles = makeStyles({
  tooltip: {
    marginTop: '0px !important',
    marginBottom: '0px !important',
    marginLeft: '0px !important',
    backgroundColor: '#ffffff',
    borderRadius: '0',
    width: '420px !important',
    padding: '36px',
  },
});

export default function StyledToolTip(props) {
  const classes = useStyles();
  return (
    <Tooltip
      enterTouchDelay={0}
      classes={{ tooltip: classes.tooltip }}
      {...props}
    />
  );
}
