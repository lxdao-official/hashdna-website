import React, { useContext } from 'react';
import Alert from '@mui/material/Alert';
import { AlertContext } from '@/context/AlertContext';
/*
*
* 这行代码是一个ES6箭头函数表达式，用于定义名为AlertPopup的React组件。该组件使用useContext钩子从AlertContext上下文中获取通知消息的内容和类型，并在屏幕的顶部中心位置显示一个Material-UI的Alert组件，以便用户可以看到有关系统状态的附加信息。

如果没有提供通知消息的text或type属性，则该组件不会渲染任何内容并返回null。否则，它将使用<Alert>元素包裹该消息，并通过severity属性指定通知的类型。此外，它还使用variant和内联样式指定了其他组件属性，例如通知框的填充和位置。

最后，该组件通过默认导出使其在应用程序中可用，以便在需要时可以轻松地将其添加到其他组件中。
* */
const AlertPopup = () => {
  const useAlert = () => useContext(AlertContext);
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        severity={type}
        variant="filled"
        sx={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          width: '360px',
          marginLeft: '-180px',
          zIndex: 10,
          fontSize: '14px',
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return null;
  }
};

export default AlertPopup;
