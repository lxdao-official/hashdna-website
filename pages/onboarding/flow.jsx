import { Typography, Box, Card, CardContent, Link } from '@mui/material';
import OnBoardingLayout from '@/components/OnBoardingLayout';
/*
*
* 导入了 Material-UI 库中的 Box、Card、CardContent、Typography 和 Link 组件，以及自定义组件 OnBoardingLayout。
定义了一个包含多个对象的数组 data，每个对象包含一个图标、一个标题、一段说明内容和一个 URL 链接地址。
在组件的渲染内容中，使用 OnBoardingLayout 组件作为页面布局，设置了标题、描述、返回按钮和下一步按钮。
在 OnBoardingLayout 组件的主体内容中，使用 Box 组件创建了一个滚动区域，并遍历 data 数组的每个元素，将其渲染为一个链接到对应 URL 地址的 Card 组件。
在 Card 组件内部，使用 Box 组件包装图标和说明文字，其中标题和说明文字都使用 Typography 组件显示。
在标题前加上了序号，使用了 span 元素和样式设置颜色为 #36AFF9，序号从 01 开始，使用 index+1 计算得出。
在组件末尾添加了一个 "Learn more" 的链接，指向一个 Notion 页面，但尚未设置跳转路径。
最后导出该组件默认值。
* */
export default function Flow() {
  const data = [
    {
      icon: '/icons/onboarding/IDEA.svg',
      title: 'IDEA',
      content:
        'LXDAO community welcomes ideas from both internal and external sources that are relevant to Web3 and have value. Anyone can propose an idea for discussion.',
      url: 'https://forum.lxdao.io/tag/idea',
    },
    {
      icon: '/icons/onboarding/PROPOSAL.svg',
      title: 'PROPOSAL',
      content:
        'Once the idea has been fully discussed by the LXDAO community, the proposal can be posted on the forum, followed by a soft vote and a hard vote.',

      url: 'https://forum.lxdao.io/c/proposals/6',
    },
    {
      icon: '/icons/onboarding/VOTE.svg',
      title: 'VOTE',
      content:
        'LXDAO values your vote as a LXDAO Builder. Your vote helps improve ideas and projects, ensures fair distribution of rewards, and confirms that LXDAO is making valuable contributions to Web3. (Only LXDAO Builders are eligible to vote.)',
      url: 'https://snapshot.org/#/lxdao.eth',
    },
    {
      icon: '/icons/onboarding/BUIDL.svg',
      title: 'BUIDL',
      content:
        "Are you ready to dive in? Explore the projects that pique your interest and join forces with us! Let's collaborate to bring your ideas to life and make a meaningful impact together.",
      url: 'https://lxdao.io/projects',
    },
    {
      icon: '/icons/onboarding/REWARDS.svg',
      title: 'REWARDS',
      content:
        'LXDAO aims to prioritize sustainability. We seek external funding through grants, donations, and investments for our projects. We also compensate LXP as a reward for your work and convert them into tokens or fiat at a later stage.',
      url: 'https://lxdao.io/LXPApplication',
    },
  ];
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="HOW DOES LXDAO WORK?"
      back="/onboarding/intro"
      next="/onboarding/buddy"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', md: 'center', lg: 'stretch' },
          mt: '64px',
          mb: '60px',
          overflow: 'scroll',
          justifyContent: 'space-between',
        }}
      >
        {data.map((value, index) => (
          <Link
            href={value.url}
            target="_blank"
            sx={{ textDecoration: 'none' }}
          >
            <Box sx={{ display: 'flex', height: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                }}
              >
                <Card
                  sx={{
                    width: { xs: 300, lg: 224 },
                    height: '100%',
                    mb: { xs: 3, lg: 0 },
                    border: '0.5px solid #D0D5DD',
                    borderRadius: '6px',
                    position: 'relative',
                  }}
                >
                  <CardContent sx={{ paddingTop: '40px', paddingX: '11' }}>
                    <Box component={'img'} src={value.icon} />
                    <Typography
                      fontWeight={800}
                      variant="subtitle1"
                      mt="43px"
                      lineHeight="24px"
                    >
                      <span style={{ color: '#36AFF9' }}>
                        {'0' + (index + 1) + ' '}
                      </span>
                      {value.title}
                    </Typography>
                    <Typography
                      color="#666F85"
                      variant="body1"
                      mt="16px"
                      textTransform="capitalize"
                    >
                      {value.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
      <Link
        color="#101828"
        href="https://www.notion.so/lxdao/How-do-we-work-23c13e7e7f294d01b285acce3668b6cd"
        target="_blank"
      >
        <Typography marginBottom="106px">Learn more →</Typography>
      </Link>
    </OnBoardingLayout>
  );
}
