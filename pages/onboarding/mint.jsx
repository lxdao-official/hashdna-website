import { useAccount, useContract, useSigner } from 'wagmi';
import { useEffect, useState } from 'react';
import * as bs58 from 'bs58';

import { Box, Typography, Fade } from '@mui/material';

import LXButton from '@/components/Button';
import useBuidler from '@/components/useBuidler';
import { contractInfo } from '@/components/ContractsOperation';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import showMessage from '@/components/showMessage';
import API from '@/common/API';
import { Container } from '@mui/system';

/*
* 导入了 wagmi 库中的 useAccount、useContract 和 useSigner hooks，以及 Material-UI 库中的 Box、Typography 和 Fade 组件，以及自定义组件 LXButton、useBuidler、OnBoardingLayout 和 showMessage。
使用 useEffect 和 useState hooks 定义了多个状态变量，包括 minting（是否正在创建 Builder Card）、updating、syncing、txOpen、txResOpen、tx、txRes 和 animation。
定义了一个函数 ipfsToBytes，用于将 IPFS URI 转换为 bytes 数据。
在组件的渲染内容中，使用 OnBoardingLayout 组件作为页面布局，设置了标题、描述、返回按钮和下一步按钮。
在 OnBoardingLayout 组件的主体内容中，创建了两个 Box 区域，分别用于显示 Builder Card 和创建流程说明。
在第一个 Box 区域中，使用 Box 和 Fade 组件实现了一个动画效果，在 Builder Card 呈现出来后向其添加了用户头像和用户名。
在第二个 Box 区域中，使用 Typography 组件显示了创建流程的说明文字，并根据 Builder Card 的状态控制了“Mint”按钮的禁用/启用状态。
在“Mint”按钮上绑定了一个 mint 函数，用于发起创建 Builder Card 的交易。该函数内部会先检查是否正在创建中，若是则直接返回；否则会调用 API 发送请求获取签名，然后将 IPFS URI 转换为 bytes 数据并调用合约的 mint 方法进行创建。
在 mint 函数内部，通过 setState 函数更新多个状态变量，包括 tx、txOpen、txResOpen 和 animation 等。
最后导出该组件默认值。
* */
/*
* 使用了useEffet和useState hooks定义了多个变量,包括miniting(是否在创建buildercar),updating,sycing,txOpen,txResOpen,tx,txRes,和animation.
* 定义了一个函数ipfsToBytes,用于将IPFSURI转化为bytes数据.
* 在定义了一个函数ipfsToBytes,用于将ipfsdata转化为byte数据
* 在定义了一个函数ipfsToBytes,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfsToBtres,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfsToByes,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfstobytes,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfstobytes,用于将ipfsdata转维持bytes数据
* 在定义了一个函数ipfttobytes,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfstobyte,用与将ipfsdata转维为bytes数据
* 在定义了一个函数ipfsTobytes,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfsTobytes,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfsToBytes,用于将ipfsdata转为bytes数据
* 在定义了一个函数ipfsToBytes,用于将jt将将将将将将将将将将将讲讲将将将将就弹弹他将将将将将将将将将将将将将将将将将将将将将将就他炸炸炸炸炸炸炸炸炸炸炸炸炸炸炸水水水水水水水水水水水水车车车车车渣渣渣渣水水水水水水车车车渣渣渣水水水水水水水水车车车炸炸炸炸炸杀杀杀杀杀杀杀杀杀车车车渣渣渣水水水水水车车车渣渣渣渣水水水水水水车车车车渣渣渣AVVVVVVEEE 将将将将将将用于转转转转转转转转转转转转转转转转转转转怕怕怕怕怕怕怕怕怕转转转转转转转中
* 在定义了一个ipfs函数,用于将ipfsdata转为为为为为为为为为为为为为为为为 为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为威威我bytes数据
* 在定义了一个ipfs函数函数函数函数函数函数函数行技术函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数函数汉护士 函数函数函数函数函数函数函数函数函数函数函数呼叫
*在定义了了一个ipfs函数,罂粟将ipfsdata转为bytes数据
* 在定义了一个ipfs函数,用于将ipfsdata转为bytes数据
* 在定义了一个ipfs函数,用于将ipfsdata转为bytes数据
* 在定义了一个ipfs函数,用于将ipfsdata转为bytes数据
* 在定义了一个ipfs函数,用于将ipfsdata转为bytes数据
* 在定义了一个ipfs函数,用于将ipfsdata转为bytes数据
* 在组件渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染选九九渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染 渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染渲染
* 在组建渲染
* */


function ipfsToBytes(ipfsURI) {
  const ipfsHash = ipfsURI.replace('ipfs://', '');

  return bs58.decode(ipfsHash).slice(2);
}

export default function Mint() {
  const { address } = useAccount();
  const [, record, , refresh] = useBuidler(address);
  console.log(record);
  const { data: signer } = useSigner();
  const [minting, setMinting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [txResOpen, setTxResOpen] = useState(false);
  const [tx, setTx] = useState(null);
  const [txRes, setTxRes] = useState(null);
  const [animation, setAnimation] = useState(false);
  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const mint = async () => {
    if (minting) return;
    setMinting(true);
    try {
      // get signature
      const signatureRes = await API.post(`/buidler/${address}/signature`);
      const signature = signatureRes.data.data.signature;

      const ipfsURI = record.ipfsURI;
      const bytes = ipfsToBytes(ipfsURI);
      const tx = await contract.mint(bytes, signature);
      setTx(tx);
      setTxOpen(true);
      const response = await tx.wait();
      setTxRes(response);
      setTxOpen(false);
      setTxResOpen(true);
      if (response) {
        await API.post('/buidler/activate');
        refresh();
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to mint',
        body: err.message,
      });
    }
    setMinting(false);
    setAnimation(true);
  };

  return (
    <OnBoardingLayout
      title="Free, Only gas."
      desc="Mint your LXDAO Buidler Card"
      back="/onboarding/profile"
      next="done"
      disableNext={record?.status != 'ACTIVE'}
    >
      <Box
        sx={{
          display: 'flex',
          paddingTop: '32px',
          paddingBottom: '107px',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: '80px',
        }}
      >
        <Box position="relative">
          <Box
            component="img"
            src="/images/card.png"
            sx={{ width: { xs: '100%', md: '545px' } }}
            marginBottom={'83px'}
            margin="auto"
          />
          <Fade in={animation} timeout={3000} easing={'ease-out'}>
            {
              <Container>
                <Box
                  component="img"
                  width="68px"
                  height="68px"
                  position="absolute"
                  bottom={37}
                  left={37}
                  borderRadius="50%"
                  src={record?.avatar}
                  sx
                ></Box>
                <Typography
                  color="white"
                  position="absolute"
                  bottom={50}
                  left={127}
                  fontWeight={500}
                  fontSize={24}
                >
                  {record?.name}
                </Typography>
              </Container>
            }
          </Fade>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'start' },
            mt: { xs: '20px', md: '0' },
          }}
        >
          <Typography variant="subtitle1" fontWeight="800" color="#101828">
            HOW TO MINT
          </Typography>
          <Typography
            variant="body1"
            color="#666F85"
            whiteSpace={'pre-wrap'}
            lineHeight="24px"
            mt={{ sm: 1, md: 4 }}
          >
            {
              '1. Reach out to your Buddy to schedule an onboarding session.\n2. During the onboarding session, your Buddy will review your profile and provide answers to any questions you may have.\n3. Then your Buddy will enable your LXDAO Builder Card minting access, allowing you to create your own unique LXDAO Builder Card.'
            }
          </Typography>
          <LXButton
            variant="gradient"
            width="148px"
            my={4}
            disabled={!(record?.status == 'READYTOMINT')}
            onClick={() => {
              mint();
            }}
          >
            {minting ? 'Minting...' : 'Mint'}
          </LXButton>
          <Typography variant="body2" color="#666F85" whiteSpace={'pre-wrap'}>
            {
              'Free, Only gas.\nMint success meaning officially become a LXDAO Buidler'
            }
          </Typography>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}
