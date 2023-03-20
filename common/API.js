/* eslint-disable no-undef */
/*
* 这是一个 JavaScript 模块，其中包含了一个名为 axios 的默认导出和一个名为 refreshAPIToken 的函数导出。

模块通过 Axios 库创建了一个 HTTP 客户端，并设置了客户端的基本 URL 以及请求头中的授权 Token。同时还导出一个用于刷新 API Token 的函数 refreshAPIToken。

如果在浏览器环境中，每次加载该模块时会从本地存储中获取 access token 并设置到 axios 请求头中。
* */
import axios from 'axios';
import { getLocalStorage } from '@/utils/utility';

if (typeof window !== 'undefined') {
  const accessToken = getLocalStorage('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_LXDAO_BACKEND_API;

function refreshAPIToken() {
  if (typeof window !== 'undefined') {
    const accessToken = getLocalStorage('accessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
}

export { refreshAPIToken };
export default axios;
