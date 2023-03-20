import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { Box, Typography, Link } from '@mui/material';

import OnBoardingLayout from '@/components/OnBoardingLayout';
import useBuidler from '@/components/useBuidler';
/*
* 导入了 wagmi 库中的 useAccount hooks 和 next/router 库中的 useRouter hooks，以及 Material-UI 库中的 Box、Typography 和 Link 组件。
导入了自定义 hooks useBuidler，用于获取指定地址的 buidler 信息。
在组件内部使用 useAccount hooks 获取当前账户地址，并使用 useRouter hooks 获取路由对象。
使用 useBuidler hooks 获取当前地址对应的 buidler 的信息，其中包括加载状态 loading、buidler 数据记录 record、错误信息 error 和刷新函数 refresh。
定义了名为 data 的变量，用于从 buidler 数据记录中解析出第一个 buddy 的地址、名称和头像信息。
在组件的渲染内容中，使用 OnBoardingLayout 组件作为页面布局，设置了标题、描述、返回按钮和下一步按钮。
在 OnBoardingLayout 组件的主体内容中，使用 Box 组件创建了一个包含图片和说明文字的区域。
在说明文字中，使用 Typography 组件显示了通过 data 变量解析出的 Buddy 名称，并设置了链接到该 Buddy 详细信息页面的路径。
在说明文字最后使用了 \n 换行符进行文本换行。
最后使用 Link 组件添加了一个 "Learn more" 的链接，但尚未设置跳转路径。
在说明文字下面使用了 Box 组件创建了一个可点击的区域，包含当前 Buddy 的名称和头像，通过 router.push 函数实现了点击后跳转到 Buddy 详细信息页面。
* */
export default function Buddy() {
  const { address } = useAccount();
  const router = useRouter();
  const [loading, record, error, refresh] = useBuidler(address);
  const data = {
    address: record?.buddies[0]?.address,
    name: record?.buddies[0]?.name,
    avatar: record?.buddies[0]?.avatar,
  };
  let host = '';
  if (typeof window !== 'undefined') {
    host = window.location.protocol + '//' + window.location.host;
  }
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="How a buddy can help you?"
      back="/onboarding/flow"
      next="/onboarding/follow"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: '108px',
          mb: '48px',
        }}
      >
        <Box
          component="img"
          src="/images/onboarding/buddy.png"
          width={411}
          height={432}
        ></Box>
        <Box>
          <Typography
            maxWidth={'720px'}
            sx={{
              whiteSpace: 'pre-wrap',
              color: '#667085',
              wordBreak: 'break-all',
            }}
          >
            {`As a new joiner in LXDAO, don't hesitate to ask any questions you may have. Your Buddy`}{' '}
            <Link href={`/buidlers/${data.address}`} color="#667085">
              {data.name}
            </Link>{' '}
            {`is here to assist you and provide answers if needed. \n\nWe encourage you to participate in DAO activities, such as joining a working group or project, attending community calls, and submitting proposals.\n\nAdditionally, your Buddy will notify you of important meetings to ensure you don't miss out. Our aim is to help you get acquainted with living in LXDAO and make the most out of your experience.\n\n`}
          </Typography>
          <Typography>
            <Link
              sx={{
                textDecorationColor: '#101828',
                color: '#101828',
                cursor: 'pointer',
              }}
              //todo: add href
            >
              Learn more →
            </Link>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px 17px',
              width: '370px',
              height: '120px',
              mt: '30px',
              background: '#FFFFFF',
              border: '0.5px solid #D0D5DD',
              borderRadius: '6px',
              cursor: 'pointer',
              gap: '50px',
            }}
            onClick={() => {
              router.push(`/buidlers/${data.address}`);
            }}
          >
            <Typography color="#101828" fontWeight="600" whiteSpace="pre-wrap">
              Your Buddy{'    '}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                color="#36AFF9"
                fontWeight="600"
                whiteSpace="pre-wrap"
                display="inline"
              >
                {data.name}
              </Typography>
              <Box
                component="img"
                src={data.avatar}
                sx={{
                  width: '80px',
                  height: '80px',
                  marginLeft: '20px',
                  border: '0.5px solid #E5E5E5',
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}
