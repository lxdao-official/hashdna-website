import OnBoardingLayout from '@/components/OnBoardingLayout';
import LXButton from '@/components/Button';
import {
  Box,
  Typography,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useState } from 'react';
import _ from 'lodash';

import { useAccount } from 'wagmi';

import CloseIcon from '@mui/icons-material/Close';
import ProfileForm from '@/components/ProfileForm';
import BuidlerContacts from '@/components/BuidlerContacts';
import { convertIpfsGateway } from '@/utils/utility';
import Tag from '@/components/Tag';
import Skills from '@/components/Skills';
import useBuidler from '@/components/useBuidler';
import showMessage from '@/components/showMessage';

import API from '@/common/API';

export function BuidlerCard({ record }) {
  const skills = record?.skills ? record?.skills : [];

  return record ? (
    <Box
      border="0.5px solid #D0D5DD"
      borderRadius="6px"
      padding={3}
      position="relative"
      height="100%"
      mt="48px"
    >
      <Box display="flex">
        {record.avatar ? (
          <Box
            flex="0 0 80px"
            width="80px"
            height="80px"
            borderRadius="6px"
            overflow="hidden"
            border="0.5px solid #E5E5E5"
            marginRight={3}
          >
            <img
              style={{ display: 'block', width: 80, height: 80 }}
              src={
                convertIpfsGateway(record.avatar) || '/images/placeholder.jpeg'
              }
              alt=""
            />
          </Box>
        ) : (
          <Skeleton
            variant="rectangular"
            width={80}
            height={80}
            sx={{ mr: 3 }}
          />
        )}

        <Box
          flex={1}
          display="flex"
          width="calc(100% - 85px)"
          flexDirection="column"
          justifyContent="space-between"
        >
          {record.name ? (
            <Typography
              variant="h5"
              sx={{
                lineHeight: '24px',
                fontWeight: '500',
                color: '#000',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {record.name}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width={104} height={16} />
          )}

          {record?.address ? (
            <Typography
              variant="body1"
              sx={{
                lineHeight: '24px',
                fontWeight: '500',
                color: '#666F85',
                textTransform: 'uppercase',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {record.address.slice(0, 16) +
                '...' +
                record.address.slice(-14, -1)}
            </Typography>
          ) : (
            <Skeleton
              variant="rectangular"
              maxWidth={315}
              height={16}
              sx={{ mr: 3 }}
            />
          )}
          {record.contacts ? (
            <Box height={{ sm: '48px', md: '36px' }} overflow="hidden">
              <BuidlerContacts contacts={record.contacts} />
            </Box>
          ) : (
            <Box
              display={'flex'}
              height={{ sm: '48px', md: '36px' }}
              overflow="hidden"
            >
              <Skeleton
                variant="circular"
                width={28}
                height={28}
                sx={{ mx: '4px' }}
              />
              <Skeleton
                variant="circular"
                width={28}
                height={28}
                sx={{ mx: '4px' }}
              />
              <Skeleton
                variant="circular"
                width={28}
                height={28}
                sx={{ mx: '4px' }}
              />
              <Skeleton
                variant="circular"
                width={28}
                height={28}
                sx={{ mx: '4px' }}
              />
            </Box>
          )}
        </Box>
      </Box>
      {record.description ? (
        <Box display="flex" flexWrap="wrap" marginTop={2}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: '24px',
              color: '#666F85',
            }}
          >
            {record.description}
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" marginTop={2}>
          <Skeleton variant="rectangular" maxWidth={432} height={20} />
          <Skeleton
            variant="rectangular"
            width={'80%'}
            height={20}
            sx={{ mt: '4px' }}
          />
        </Box>
      )}
      {record.role.length > 0 ? (
        <Box display="flex" flexWrap="wrap" marginTop={2}>
          {record.role.map((item) => {
            return <Tag key={item} text={item}></Tag>;
          })}
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" marginTop={2}>
          <Skeleton
            variant="rectangular"
            width={65}
            height={23}
            sx={{ mt: '4px', mr: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            width={170}
            height={23}
            sx={{ mt: '4px', mr: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            width={130}
            height={23}
            sx={{ mt: '4px', mr: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            width={70}
            height={23}
            sx={{ mt: '4px', mr: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            width={125}
            height={23}
            sx={{ mt: '4px', mr: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            width={70}
            height={23}
            sx={{ mt: '4px', mr: '4px' }}
          />
        </Box>
      )}
      {skills.length > 0 ? (
        <Box marginTop={2}>
          <Typography
            color="#101828"
            fontWeight="600"
            marginBottom={1}
            variant="body1"
          >
            Skills
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Skills skills={skills} />
          </Box>
        </Box>
      ) : (
        <Box marginTop={2}>
          <Typography
            color="#101828"
            fontWeight="600"
            marginBottom={1}
            variant="body1"
          >
            Skills
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Skeleton
              variant="rectangular"
              width={137}
              height={21}
              sx={{ mt: '4px', mr: '4px', bgcolor: '#009fff' }}
            />
            <Skeleton
              variant="rectangular"
              width={60}
              height={21}
              sx={{ mt: '4px', mr: '4px', bgcolor: '#009fff' }}
            />
            <Skeleton
              variant="rectangular"
              width={48}
              height={21}
              sx={{ mt: '4px', mr: '4px', bgcolor: '#b6dffd' }}
            />
            <Skeleton
              variant="rectangular"
              width={142}
              height={21}
              sx={{ mt: '4px', mr: '4px', bgcolor: '#b6dffd' }}
            />
          </Box>
        </Box>
      )}
    </Box>
  ) : (
    <Box
      border="0.5px solid #D0D5DD"
      borderRadius="6px"
      padding={3}
      position="relative"
      height="100%"
      mt="48px"
    >
      <Box display="flex">
        <Skeleton variant="rectangular" width={80} height={80} sx={{ mr: 3 }} />
        <Box
          flex={1}
          display="flex"
          width="calc(100% - 85px)"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Skeleton variant="rectangular" width={104} height={16} />
          <Skeleton
            variant="rectangular"
            maxWidth={315}
            height={16}
            sx={{ mr: 3 }}
          />

          <Box
            display={'flex'}
            height={{ sm: '48px', md: '36px' }}
            overflow="hidden"
          >
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" marginTop={2}>
        <Skeleton variant="rectangular" maxWidth={432} height={20} />
        <Skeleton
          variant="rectangular"
          width={'80%'}
          height={20}
          sx={{ mt: '4px' }}
        />
      </Box>

      <Box display="flex" flexWrap="wrap" marginTop={2}>
        <Skeleton
          variant="rectangular"
          width={65}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={170}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={70}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={125}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={70}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
      </Box>

      <Box marginTop={2}>
        <Typography
          color="#101828"
          fontWeight="600"
          marginBottom={1}
          variant="body1"
        >
          Skills
        </Typography>
        <Box display="flex" flexWrap="wrap">
          <Skeleton
            variant="rectangular"
            width={137}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#009fff' }}
          />
          <Skeleton
            variant="rectangular"
            width={60}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#009fff' }}
          />
          <Skeleton
            variant="rectangular"
            width={48}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#b6dffd' }}
          />
          <Skeleton
            variant="rectangular"
            width={142}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#b6dffd' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
/*
* 这段代码包含了一个 React 函数组件 BuidlerCard，它接受一个名为 record 的属性对象。该组件渲染出一个用户信息的卡片，包括用户姓名、地址、头像、联系方式、描述、角色和技能等信息。

如果传入的 record 属性为空或未定义，那么组件将会使用 MUI 库中的 Skeleton 组件渲染一个占位符来代替真实的用户信息。Skeleton 是一种卡片骨架屏效果，用于提高页面加载时的用户体验。

在卡片的渲染过程中，组件使用了 Box、Typography、Dialog 和 Icon 等 MUI 库的组件。同时还使用了 lodash、react、wagmi 等库，以及自定义的组件如 ProfileForm、BuidlerContacts、Tag、Skills、useBuidler 和 showMessage 等。此外，代码还使用了 API 模块来处理网络请求。
* */

export default function Profile() {
  const { address } = useAccount();
  const [loading, record, error, refresh] = useBuidler(address);
  const [visible, setVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const saveProfileHandler = async (newMetaData) => {
    setUpdating(true);
    const userProfile = {
      ...newMetaData,
      role: record.role.length === 0 ? ['Buidler'] : record.role,
      // set the NFT image
      image: `${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`,
    };
    try {
      const response = await API.put(`/buidler/${address}`, {
        metaData: userProfile,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      }
      setVisible(false);
      refresh();
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to update profile',
        body: err.message,
      });
    }
    setUpdating(false);
  };
  return (
    <OnBoardingLayout
      title="Update your buidler profile on LXDAO"
      desc="Update your buidler profile on LXDAO"
      back="/onboarding/follow"
      next="/onboarding/mint"
      disableNext={!record?.name}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: '48px',
        }}
      >
        <Box width={{ xs: '100%', sm: '505px' }}>
          <BuidlerCard record={record} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', sm: '505px' },
            mt: '16px',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <LXButton
            width={104}
            variant="gradient"
            onClick={() => {
              setVisible(true);
            }}
          >
            Edit
          </LXButton>
        </Box>
      </Box>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        onClose={(event, reason) => {
          if (reason && reason == 'backdropClick') return;
          setVisible(false);
        }}
        open={visible}
      >
        <Box
          onClick={() => {
            setVisible(false);
          }}
          sx={{
            cursor: 'pointer',
          }}
          position="absolute"
          top="16px"
          right="16px"
        >
          <CloseIcon></CloseIcon>
        </Box>
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          <ProfileForm
            updating={updating}
            values={_.cloneDeep(
              _.pick(record, [
                'avatar',
                'name',
                'description',
                'skills',
                'interests',
                'contacts',
                'privateContacts',
              ])
            )}
            saveProfileHandler={saveProfileHandler}
          />
        </DialogContent>
      </Dialog>
    </OnBoardingLayout>
  );
}
/*
*
* 这段代码是一个名为 Profile 的 React 函数组件。它通过调用 useAccount 钩子函数获取当前用户的地址，并将其作为参数传递给 useBuidler 钩子函数，以获取与该地址相关的用户信息，包括姓名、地址、头像、联系方式、描述、角色和技能等信息。同时，组件还使用了 useState 钩子函数来声明了两个状态变量 visible 和 updating。

组件的主要功能是在 LXDAO 平台上更新用户信息，其中 saveProfileHandler 函数用于保存用户提交的新个人信息。在保存过程中，组件首先设置 updating 状态为 true，然后将新的个人信息合并到原始数据中，最后调用 API 模块发送网络请求，将更新的数据存储到服务器端。

为了方便用户查看和编辑自己的个人信息，组件还渲染出一个显示用户卡片的 BuidlerCard 组件，并提供一个 "Edit" 按钮，点击该按钮将会弹出一个对话框，允许用户编辑自己的个人信息。对话框中使用了 LXButton 和 ProfileForm 组件，分别用于显示保存按钮和个人信息表单。最后，组件还使用了 showMessage 函数来向用户提示错误消息。

整个组件还继承了一个名为 OnBoardingLayout 的布局组件，用于展示页面标题、说明、返回和下一步等信息。
* */
