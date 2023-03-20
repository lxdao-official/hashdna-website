import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';
import { Box, Dialog, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import getTheme from '../common/theme';
/*
*
* 这是一个React组件和一个函数，组件名为"SimpleModal"，函数名为"showMessage"。

"SimpleModal"组件引入了Dialog、Box和Typography等Material-UI库的组件，
* 并从@mui/icons-material/Error和@mui/icons-material/CheckCircle中导入ErrorIcon和CheckCircleIcon。
* 该组件用于显示一个对话框，包含一个标题和一段正文内容，并可以选择性地带有成功或错误图标。在渲染过程中，当对话框关闭时，将触发onClose prop的回调函数。

"showMessage"函数可用于显示一个消息对话框，给定一个标题、正文内容和消息类型（成功或错误）。
* 在渲染过程中，它使用ReactDOM.render()方法将"SimpleModal"组件渲染到一个容器中，
* 并根据用户操作来更新对话框的可见性状态。该函数返回undefined，它只提供了一个用于显示信息的便捷API。
* */
const IconWrapper = styled.div``;

const DialogWrapper = styled.div`
  padding: 20px;
  min-width: 200px;
  width: 100%;
  max-width: 450px;
  display: flex;
`;

const DialogBody = styled.div`
  margin-top: 10px;
  color: #00000073;
  line-height: 1.6;
  word-break: break-word;
`;

export function SimpleModal(props) {
  const { onClose, visible } = props;

  return (
    <Dialog onClose={onClose} open={visible}>
      <DialogWrapper>
        {props.type && (
          <IconWrapper>
            {props.type === 'success' ? (
              <CheckCircleIcon
                sx={{
                  fontSize: '40px',
                }}
                color="success"
              ></CheckCircleIcon>
            ) : (
              <ErrorIcon
                sx={{
                  fontSize: '40px',
                }}
                color="error"
              ></ErrorIcon>
            )}
          </IconWrapper>
        )}
        <Box paddingX={1}>
          <Box>
            <Typography lineHeight={2} variant="h6">
              {props.title}
            </Typography>
          </Box>
          <DialogBody>{props.body}</DialogBody>
        </Box>
      </DialogWrapper>
    </Dialog>
  );
}

function showMessage(options) {
  const { title, body, type } = options;
  const container = document.createDocumentFragment();

  function render({ visible }) {
    ReactDOM.render(
      <ThemeProvider theme={getTheme('light')}>
        <SimpleModal
          title={title}
          visible={visible}
          body={body}
          type={type}
          onClose={close}
        />
      </ThemeProvider>,
      container
    );
  }

  function close() {
    render({ visible: false });
  }

  render({ visible: true });
}

export default showMessage;
