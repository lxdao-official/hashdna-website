import { createContext, useState } from 'react';
/*
*
* 这段代码定义了一个名为 AlertContext 的 React Context，包含以下功能：

使用了 React 中的 createContext 和 useState hooks。
定义了常量 ALERT_TIME，表示弹出提示框后，多长时间后自动关闭提示框。
定义了名为 initialState 的对象，表示提示框的初始状态。包括 text 和 type 两个属性，分别表示提示文本和提示类型。
在 AlertContext 中使用 createContext 创建了一个上下文，其中包含默认值为 initialState 和 setAlert 空函数的对象。
定义了名为 AlertProvider 的组件，用于提供 AlertContext 上下文环境，并接受 children 属性作为参数。
在 AlertProvider 组件内部，使用 useState hooks 分别创建了 text 和 type 两个状态变量，并将它们的初始值设置为空字符串。
定义了名为 setAlert 的函数，用于在 AlertProvider 内部更新 text 和 type 状态，并在一定时间后自动清空它们。该函数接受 text 和 type 两个参数，分别表示要显示的提示文本和提示类型。
最终使用 AlertContext.Provider 组件将 AlertProvider 包裹起来，将 text、type 和 setAlert 状态通过 value 属性传递给子组件。
* */
const ALERT_TIME = 5000;
const initialState = {
  text: '',
  type: '',
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');

  const setAlert = (text, type) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText('');
      setType('');
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider, AlertContext };
