import {
  Box,
  Typography,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  Button,
} from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled as muistyle } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import useWindowSize from 'react-use/lib/useWindowSize';
import styled, { keyframes } from 'styled-components';
import Confetti from 'react-confetti';

import LXButton from '@/components/Button';
import useBuidler from '@/components/useBuidler';
/*
* 这段代码实现了一个名为 OnBoardingAlertBtn 的React组件，用于在应用程序中显示一个按钮，该按钮可用于完成 LXDAO 社区的入门流程。该组件使用了多个 React 和 Material-UI 组件，例如 Box、Typography、Link、Menu、MenuItem、Tooltip、Dialog 和 Button。

在组件内部，根据用户的当前状态和路由信息等条件来呈现不同的 UI 界面，并使用 LightTooltip 和 RotateBorder 组件创建带有旋转动画和提示文本的按钮图标。同时，使用 useAccount 和 useBuidler 钩子获取当前账户地址和 Buidler 状态。通过 Confetti 组件添加庆祝动画效果，并将其触发条件设置为 open 变量。此外，还使用 Dialog 组件创建一个对话框，其中包含一些提示信息和操作按钮。

要使用 OnBoardingAlertBtn 组件，请将其导入并将其放置在应用程序中需要显示该按钮的位置即可。请注意，在使用该组件之前，必须安装 react-use 和 styled-components 模块。
*
*
*
* 在这段代码中，使用了 useRouter 钩子来获取 Next.js 中的路由对象。该钩子可以用于访问路由信息、查询参数和 URL 路径等。通过调用 router.push 方法可以实现页面跳转，例如 router.push('/onboarding/mint') 将会导航到名为 mint 的页面。

在组件内部，使用 router.asPath 属性来判断当前路径是否包含 onboarding，从而决定是否显示按钮。同时，将某些操作的路由绑定到按钮的 onClick 事件中，例如 router.push('/onboarding/intro') 将会在用户点击按钮后导航到 intro 页面。因此，通过 useRouter 钩子可以轻松管理应用程序的路由。
* */
const LightTooltip = muistyle(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '6px',
    color: '#666F85',
    fontSize: '16px',
    maxWidth: 400,
    lineHeight: '24px',
  },
}));

const RotateAni = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const RotateBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 46px;
  height: 46px;
  animation: ${RotateAni} 10s linear infinite;

  background-image: url('/icons/ani-border.svg');
`;

const RotateAniR = keyframes`
  to {
    transform: rotate(-360deg);
  }
`;
const RotateContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(180deg, #00fb8c 0%, #36aff9 100%);
  cursor: pointer;
  animation: ${RotateAniR} 10s linear infinite;
`;

export default function OnBoardingAlertBtn() {
  const { address } = useAccount();
  const [, buidler] = useBuidler(address);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();
  const { width, height } = useWindowSize();
  useEffect(() => {
    setSize({
      width: width,
      height: height,
    });
  }, [width, height]);

  return (
    <>
      <Confetti
        width={size.width}
        height={size.height}
        recycle={false}
        run={open}
      />
      {(buidler?.status == 'PENDING' || buidler?.status == 'READYTOMINT') && (
        <Box display={router.asPath.includes('onboarding') ? 'none' : 'normal'}>
          <LightTooltip title="Click me to complete the onborading process.">
            <RotateBorder
              onClick={() => {
                setOpen(true);
              }}
            >
              <RotateContent>
                <Box component="img" src="/icons/user-block.svg"></Box>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '900',
                    lineHeight: '20px',
                    backgroundColor: '#FF0000',
                    left: '52%',
                    bottom: '52%',
                    border: '2px solid #fff',
                  }}
                >
                  !
                </Box>
              </RotateContent>
            </RotateBorder>
          </LightTooltip>
        </Box>
      )}

      <Dialog open={open} maxWidth="714px">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '39px 50px 54px 50px',
            borderRadius: '12px',
          }}
        >
          <Box
            component="img"
            width="178px"
            src="/images/congratulate.png"
          ></Box>
          <Typography
            sx={{
              background:
                'linear-gradient(90deg, #0B7BFF 0%, #00FB8C 50.17%, rgba(255, 237, 54, 0.85) 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontSize: '32px',
              fontWeight: '600',
              mt: '10px',
            }}
          >
            Congratulations!
          </Typography>
          <Typography
            color="#666F85"
            fontWeight="400"
            variant="body1"
            textAlign="center"
            lineHeight="24px"
            maxWidth="604px"
            sx={{
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              mt: '17px',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>
              {address?.slice(0, 4) + '...' + address?.slice(-4, -1)}
            </span>
            , congratulations on successfully passing the hard voting process
            for the LXDAO Community. While you have made significant progress
            towards becoming a Builder for LXDAO, there are a few remaining
            steps that you must complete before becoming an official member.
          </Typography>
          <LXButton
            mb="20px"
            mt="66px"
            variant="gradient"
            onClick={() => {
              if (buidler?.status == 'READYTOMINT') {
                router.push('/onboarding/mint');
                return;
              }
              if (buidler?.contacts) {
                router.push('/onboarding/profile');
                return;
              }
              router.push('/onboarding/intro');
            }}
          >
            Onboarding
          </LXButton>
          <Button
            sx={{ color: '#666F85', textTransform: 'capitalize' }}
            onClick={() => {
              setOpen(false);
            }}
          >
            Do it later
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
