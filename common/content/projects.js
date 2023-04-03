
/*
* 这是一个JavaScript代码块，其中包含了一个名为 projects 的常量数组，该数组包含了五个对象，
* 每个对象表示一个Web3项目的详细信息，包括id、banner、logo、logoLarge、title、status、type、description、launchDate、contributors和links等属性。
* 最后，将该数组通过默认导出方式暴露。
* */
const projects = [
  {
    id: '000',
    banner: '/images/projects/gclx-banner.png',
    logo: '/images/projects/gclx-logo.png',
    logoLarge: '/images/projects/gclx-logo-square.png',
    title: 'GuoChanLiangXin',
    status: 'LAUNCHED',
    type: ['NFT', 'OPEN SOURCE'],
    description:
      'GCLX NFT project is a Performance Art. It is made by 1000 randomly generated NFTs, sold for 0.01 ETH. Using funny content to tell Chinese NFT players what NFTs truly are.',
    launchDate: '23th Feb 2022',
    contributors: [
      {
        name: 'Bruce Xu',
        avatar: '/images/bruce.jpeg',
        title: 'Co-Founder',
        description:
          'Web3 BUIDLER and BELIEVER! Creator of GuoChanLiangXin and MyFirstNFT. Member @theNextDAO. Core contributor @GCLX community.',
        twitter: 'https://twitter.com/brucexu_eth',
      },
      {
        name: 'Muxin',
        avatar: '/images/muxin.jpeg',
        title: 'Artist',
        description:
          'Web3 BUIDLER. Artist of GuoChanLiangXin. Core Member @LXDAO. Member @theNextDAO. Core contributor @GCLX community.',
        twitter: 'https://twitter.com/muxin_eth',
      },
    ],
    links: [
      {
        name: 'website',
        url: 'https://gclx.xyz/',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/gclxnft',
      },
      {
        name: 'opensea',
        url: 'https://opensea.io/collection/gclx',
      },
      {
        name: 'github',
        url: 'https://github.com/lxdao-official',
      },
      {
        name: 'forum',
        url: 'https://forum.lxdao.io/c/projects/000-gclx/13',
      },
    ],
  },
  {
    id: '001',
    banner: '/images/projects/mfnft-banner.png',
    logo: '/images/projects/mfnft-logo.png',
    logoLarge: '/images/projects/mfnft-logo-square.png',
    title: 'MyFirstNFT',
    status: 'LAUNCHED',
    type: ['PUBLIC GOODS', 'EDUCATIONAL', 'OPEN SOURCE', 'NFT'],
    description:
      'MyFirstNFT is a non-profit instructional project for Web3 newbies. Get a FREE NFT while learning about Web3, underlying values of NFT, and security principles.',
    launchDate: '15th May 2022',
    contributors: [
      {
        name: 'Bruce Xu',
        avatar: '/images/bruce.jpeg',
        title: 'Originator / Developer',
        description:
          'Web3 BUIDLER and BELIEVER! Creator of GuoChanLiangXin and MyFirstNFT. Member @theNextDAO. Core contributor @GCLX community.',
        twitter: 'https://twitter.com/brucexu_eth',
      },
      {
        name: 'Muxin',
        avatar: '/images/muxin.jpeg',
        title: 'Artist / Developer',
        description:
          'Web3 BUIDLER. Artist of GuoChanLiangXin. Core Member @LXDAO. Member @theNextDAO. Core contributor @GCLX community.',
        twitter: 'https://twitter.com/muxin_eth',
      },
      {
        name: 'Kahn Yuan',
        avatar: '/images/kahn.jpg',
        title: 'Developer',
        description: 'Ex-Bybit, Mobile Dev, 12yrs',
      },
    ],
    links: [
      {
        name: 'website',
        url: 'https://myfirstnft.info/',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/mfnft_official',
      },
      {
        name: 'discord',
        url: 'https://discord.lxdao.io',
      },
      {
        name: 'opensea',
        url: 'https://opensea.io/collection/mfnft-official',
      },
      {
        name: 'github',
        url: 'https://github.com/lxdao-official',
      },
      {
        name: 'forum',
        url: 'https://forum.lxdao.io/c/projects/001-mfnft/14',
      },
    ],
  },
  {
    id: '002',
    banner: '/images/projects/metapavo-banner.png',
    logo: '/images/projects/metapavo-logo.png',
    logoLarge: '/images/projects/metapavo-logo-square.png',
    title: 'MetaPavo',
    status: 'IN PROGRESS',
    type: ['EXTENSION'],
    description:
      'MetaPavo is a product for fast indexing of Web3 information. It presents the complicated information in Web3 to users in an intuitive, fast and clear way through a special structural abstraction and presentation expression, helping users to efficiently absorb information , and make decisions.',
    contributors: [
      {
        name: 'Yootou',
        avatar: '/images/yootou.png',
        title: 'Project Manager / Developer',
        description: 'Fullstack developer / Web3 builder / I have a dream.',
        twitter: 'https://twitter.com/0xYootou',
      },
      {
        name: 'DaoDAO',
        avatar: '/images/daodao.jpeg',
        title: 'Project Designer',
        description: 'Product Design, 13yrs.',
        twitter: 'https://twitter.com/muxin_eth',
      },
      {
        name: 'Kuncle',
        avatar: '/images/kuncle.jpeg',
        title: 'Big Data Developer',
        description: 'Ex-Alibaba, Data Infra, 8yrs',
        twitter: 'https://twitter.com/KingsUncle1',
      },
      {
        name: 'Teng Wang',
        avatar: '/images/wang.png',
        title: 'UI/UX Designer',
        description: 'UI/UX Designer, 7yrs',
        twitter: 'https://twitter.com/goodtombetter',
      },
      {
        name: 'Black3',
        avatar: '/images/super-lee.png',
        title: 'Developer',
        description: 'Ex-Alibaba, Ex-ByteDance, 13yrs',
        twitter: 'https://twitter.com/besteric',
      },
    ],
    links: [
      {
        name: 'forum',
        url: 'https://forum.lxdao.io/c/projects/002-metapavo/15',
      },
    ],
  },
  {
    id: '003',
    banner: '/images/projects/2032-banner.png',
    logo: '/images/projects/2032-logo.png',
    logoLarge: '/images/projects/2032-logo-square.png',
    title: 'Web3 in 2032',
    status: 'LAUNCHED',
    type: ['NFT'],
    description:
      'In 2032, there are a billion people live on Web3 everyday. This project documents something that will have happened on Web3 in 2032.',
    launchDate: '14th Jul 2022',
    contributors: [
      {
        name: 'Bruce Xu',
        avatar: '/images/bruce.jpeg',
        title: 'Creator / Developer',
        description:
          'Web3 BUIDLER and BELIEVER! Creator of GuoChanLiangXin and MyFirstNFT. Member @theNextDAO. Core contributor @GCLX community.',
        twitter: 'https://twitter.com/brucexu_eth',
      },
      {
        name: 'Yootou',
        avatar: '/images/yootou.png',
        title: 'Developer',
        description: 'Fullstack developer / Web3 builder / I have a dream.',
        twitter: 'https://twitter.com/0xYootou',
      },
      {
        name: 'Teng Wang',
        avatar: '/images/wang.png',
        title: 'UI/UX Designer',
        description: 'UI/UX Designer, 7yrs',
        twitter: 'https://twitter.com/goodtombetter',
      },
      {
        name: 'Marcus',
        avatar: '/images/mrzzz.jpg',
        title: 'Operation',
        description: '3D Animation Artist, 4yr',
        twitter: 'https://twitter.com/Bitzack_01',
      },
    ],
    links: [
      {
        name: 'website',
        url: 'https://web3in2032.io/',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/Web3in2032',
      },
      {
        name: 'discord',
        url: 'https://discord.lxdao.io',
      },
      {
        name: 'opensea',
        url: 'https://opensea.io/collection/web3-in-2032',
      },
      {
        name: 'forum',
        url: 'https://forum.lxdao.io/c/projects/003-2032/17',
      },
    ],
  },
  {
    id: '004',
    banner: '/images/projects/marry3-banner.png',
    logo: '/images/projects/marry3-logo.png',
    logoLarge: '/images/projects/marry3-logo-square.png',
    title: 'Marry3',
    status: 'LAUNCHED',
    type: ['SBT', 'OPEN SOURCE', 'NFT'],
    description:
      'https://Marry3.love is a dapp help you create Paired Soulbound Marriage Certificate Token, non-sell, non-transfer, forever on chain~~~',
    launchDate: '7th Jun 2022',
    contributors: [
      {
        name: 'Yootou',
        avatar: '/images/yootou.png',
        title: 'Co-Founder / Developer',
        description: 'Fullstack developer / Web3 builder / I have a dream.',
        twitter: 'https://twitter.com/0xYootou',
      },
      {
        name: 'DaoDAO',
        avatar: '/images/daodao.jpeg',
        title: 'Project Designer',
        description: 'Product Design, 13yrs.',
        twitter: 'https://twitter.com/muxin_eth',
      },
    ],
    links: [
      {
        name: 'website',
        url: 'https://marry3.love/',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/marryinweb3',
      },
      {
        name: 'discord',
        url: 'https://discord.lxdao.io',
      },
      {
        name: 'opensea',
        url: 'https://opensea.io/collection/marry3',
      },
      {
        name: 'github',
        url: 'https://github.com/marryinweb3',
      },
      {
        name: 'forum',
        url: 'https://forum.lxdao.io/c/projects/004-marry3/16',
      },
    ],
  },
];

export default projects;
