/* eslint-disable no-undef */
import React, { useRef, useEffect } from 'react';
import { Link, Box } from '@mui/material';
import { getDefaultWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  useSignMessage,
  useDisconnect,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';

import API, { refreshAPIToken } from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';
import showMessage from '@/components/showMessage';

import '@rainbow-me/rainbowkit/styles.css';
/*
* 这段代码主要实现以下功能：

配置和初始化 wagmiClient，该 client 用于管理区块链连接并提供与链交互的方法。
实现一个 ConnectWalletButton 组件，该组件使用 wagmiClient 提供的钱包连接API来与以太坊网络建立连接，并在用户连接成功后调用API来获取访问令牌。
处理用户连接、断开连接和消息签名等事件，并根据这些事件更新应用程序的状态和本地存储。
在特定事件发生时，使用 showMessage 函数从 API 中检索数据并呈现消息，以向用户提供有关其连接状态的信息。
具体而言，该代码库还包含其他辅助函数和导入的依赖项，但它们都是为了支持上述主要功能而存在的。其中，使用 @mui/material 库以及自定义 CSS 样式来渲染一些UI元素，同时也使用了 wagmi 和 @rainbow-me/rainbowkit 等第三方库来帮助处理与以太坊区块链之间的通信。
*
* */
const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'LXDAO Official Website',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const ConnectWalletButton = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: signature, signMessageAsync } = useSignMessage();
  const addressInfo = useRef({ address });

  useEffect(() => {
    (async () => {
      if (isConnected) {
        const currentAccessToken = getLocalStorage('accessToken');
        if (address && !currentAccessToken) {
          await handleNonce(address);
        }
      }
    })();
  }, [isConnected]);

  useEffect(() => {
    (async () => {
      const currentAccessToken = getLocalStorage('accessToken');
      if (signature && !currentAccessToken) {
        await signIn(signature);
      }
    })();
  }, [signature]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (isDisconnected && currentAccessToken) {
      removeLocalStorage('accessToken');
      refreshAPIToken();
    }
  }, [isDisconnected]);

  useEffect(() => {
    (async () => {
      if (
        addressInfo.current.address &&
        addressInfo.current.address !== address
      ) {
        removeLocalStorage('accessToken');
        refreshAPIToken();
        disconnect();
        addressInfo.current.address = undefined;
        window.location.reload();
      }
    })();
  }, [address]);

  const handleNonce = async () => {
    try {
      const nonceRes = await API.get(`/buidler/${address}/nonce`);
      const signatureMessage = nonceRes.data?.data?.signature_message;
      const nonce = nonceRes.data?.data?.nonce;
      // no builder record in DB
      if (!nonce) {
        showMessage({
          type: 'error',
          title: 'Cannot find your LXDAO builder record',
          body: (
            <Box>
              It seems you are not a LXDAO buidler, welcome to{' '}
              <Link marginBottom={2} target="_blank" href={`/joinus`}>
                join us
              </Link>
              . Let&apos;s buidler a better Web3 together!
            </Box>
          ),
        });
        disconnect();
      } else if (signatureMessage) {
        await signMessageAsync({
          message: signatureMessage,
        });
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to sign-in',
        body: err.message,
      });
      disconnect();
    }
  };

  const signIn = async (signature) => {
    try {
      const signinRes = await API.post(`/auth/signin`, {
        address: address,
        signature: signature,
      });

      const accessToken = signinRes.data?.data?.access_token;
      setLocalStorage('accessToken', accessToken);
      refreshAPIToken();
      addressInfo.current.address = address;
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to sign-in',
        body: err.message,
      });
      disconnect();
    }
  };

  return (
    <ConnectButton
      showBalance={false}
      chainStatus="none"
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}
    />
  );
};

export { wagmiClient, chains, ConnectWalletButton };
