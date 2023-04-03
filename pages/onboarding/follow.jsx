import { Box, Typography, Link } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import { useEffect, useState } from 'react';
/*
* 导入了 Material-UI 库中的 Box、Typography、Link、FormLabel、FormControl、FormGroup、FormControlLabel、FormHelperText 和 Checkbox 组件，以及自定义组件 OnBoardingLayout 和 useEffect、useState hooks。
使用 useState hooks 定义了一个名为 state 的状态变量，其初始值为一个长度为 7 的布尔数组，表示每个社交媒体和平台的选中状态，默认均为未选中。
使用 useEffect hooks 在组件挂载时从 sessionStorage 中读取上次保存的选中状态，若存在则使用其进行初始化；同时在 state 发生改变时将其保存到 sessionStorage 中。
定义了一个包含多个 Typography 和 Link 组件的数组 data，分别表示不同社交媒体和平台的介绍和链接地址。
定义了一个 handleChange 函数，用于处理用户的勾选操作，并根据新的选中状态更新 state 变量的值。
定义了一个 selectAll 常量，表示当前是否全部选中了所有社交媒体和平台。
在组件的渲染内容中，使用 OnBoardingLayout 组件作为页面布局，设置了标题、描述、返回按钮、下一步按钮和禁用条件（若未选中所有社交媒体和平台则禁用）。
在 OnBoardingLayout 组件的主体内容中，使用 Box 组件创建了一个包含 FormGroup、FormControlLabel 和 Checkbox 组件的区域，用于显示和控制每个社交媒体和平台的选中状态。
在 FormControlLabel 组件中，将每个社交媒体和平台的介绍和链接地址转化为对应的 label 属性，并将其与对应的 Checkbox 组件绑定。
最后使用 Box 组件添加了一个图片来装饰页面。
最后导出该组件默认值。
* */
export default function Follow() {
  const [state, setState] = useState(new Array(7).fill(false));
  useEffect(() => {
    const checked = sessionStorage?.getItem('checked');
    setState(checked ? checked.split(',').map((v) => v == 'true') : state);
  }, []);
  useEffect(() => {
    sessionStorage.setItem('checked', state.toString());
  }, [state]);
  const data = [
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Follow the official Twitter:{' '}
      <Link href="https://twitter.com/LXDAO_Official" color="#36AFF9">
        https://twitter.com/LXDAO_Official
      </Link>
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Follow the LXDAO Twitter List:{' '}
      <Link
        href="https://twitter.com/i/lists/1576113456792551424"
        color="#36AFF9"
      >
        https://twitter.com/i/lists/1576113456792551424
      </Link>
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Register on Forum:{' '}
      <Link href="https://forum.lxdao.io" color="#36AFF9">
        https://forum.lxdao.io
      </Link>{' '}
      (main community)
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Discord:{' '}
      <Link href="http://discord.lxdao.io/" color="#36AFF9">
        http://discord.lxdao.io/
      </Link>{' '}
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Notion:{' '}
      <Link href="https://lxdao.notion.site/" color="#36AFF9">
        https://lxdao.notion.site/
      </Link>
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      GitHub:{' '}
      <Link href="https://github.com/lxdao-official" color="#36AFF9">
        https://github.com/lxdao-official
      </Link>{' '}
      (for developers)
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Subscribe newsletter with your email (on the bottom of{' '}
      <Link href="https://lxdao.io/" color="#36AFF9">
        https://lxdao.io/
      </Link>
      )
    </Typography>,
  ];
  const handleChange = (event) => {
    let pre = [...state];
    pre[event.target.name] = event.target.checked;
    setState(pre);
  };
  const selectAll = state.filter((v) => v).length == 7;
  return (
    <OnBoardingLayout
      title="Follow LXDAO Community"
      desc="Follow our main social media and community platforms"
      back="/onboarding/buddy"
      next="/onboarding/profile"
      disableNext={!selectAll}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'start' },
          mt: '25px',
          mb: '48px',
        }}
      >
        <Box>
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormGroup>
              {data.map((value, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: '#999CA0',
                          '&.Mui-checked': {
                            color: '#36AFF9',
                          },
                          wordBreak: 'break-all',
                        }}
                        checked={state[index]}
                        onChange={handleChange}
                        name={index}
                      />
                    }
                    label={value}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Box>
        <Box
          component="img"
          src="/icons/onboarding/follow.svg"
          sx={{
            mt: { sx: '32px', md: '84px' },
            mb: { sx: '32px', md: '71px' },
          }}
        />
      </Box>
    </OnBoardingLayout>
  );
}
