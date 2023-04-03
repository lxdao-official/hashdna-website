import React, { useState, useEffect } from 'react';
import API from '@/common/API';
/*
* 这段代码定义了一个名为 useBuidler 的自定义 hooks，用于获取指定地址的 buidler 详情信息。它包含以下功能：

使用了 React 中的 useState 和 useEffect hooks。
接收一个 address 参数，用于指定要获取详情信息的 buidler 地址。
定义了名为 loading、buidler 和 error 的三个 state 变量，并将它们初始化为 true、null 和 null。
定义了一个 request 函数，用于向远程 API 发送请求，获取指定地址的 buidler 详情信息。
在 request 函数内部，如果传入的地址为空，则直接返回，否则发送请求获取详情信息。
将响应数据中的状态信息解析出来，如果状态不为 "SUCCESS"，则设置 error 状态为 "Cannot get buidler detail"。
最终将 loading 状态设置为 false，buidler 状态设置为响应数据中的 buidler 详情信息。
定义了一个 refresh 函数，用于重新获取当前指定地址的 buidler 详情信息。
在 useEffect 中监听 address 是否发生变化，并在变化时调用 request 函数重新获取详情信息。
返回一个数组，包含四个元素：loading、buidler、error 和 refresh，分别表示当前是否在加载中、获取到的 buidler 详情信息、错误信息以及刷新函数。
*
* */
function useBuidler(address) {
  const [buidler, setBuidler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const request = async () => {
    if (!address) return;
    setLoading(true);
    const data = await API.get(`/buidler/${address}`);
    const result = data?.data;
    if (result.status !== 'SUCCESS') {
      // error
      setError('Cannot get buidler detail');
    }
    setLoading(false);
    setBuidler(result.data);
  };

  function refresh() {
    request(address);
  }

  useEffect(() => {
    (async () => {
      await request(address);
    })();
  }, [address]);

  return [loading, buidler, error, refresh];
}

export default useBuidler;
