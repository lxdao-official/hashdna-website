import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Link, Menu, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import OnBoardingAlertBtn from './OnBoardingAlertBtn';
import { ConnectWalletButton } from '@/components/ConnectWallet';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [governance, setGovernance] = useState(null);
  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(open);
  };

  const handleGovernanceMenuClick = (event) => {
    setGovernance(event.currentTarget);
  };

  const handleGovernanceMenuClose = () => {
    setGovernance(null);
  };

  const HiddenMenu = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push('/projects');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Projects</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push('/buidlers');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Buidlers</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`https://lxdao.notion.site/`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Docs</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`/LXPAnnouncement`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>
                LXP Announcement
              </Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`https://forum.lxdao.io/c/governance/10`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Weekly Update</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`https://forum.lxdao.io/c/governance/monthly-ama/12`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Monthly AMA</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={{ md: '128px', sm: '120px', xs: '120px' }}
        maxWidth="1216px"
        marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
      >
        <Box
          onClick={() => {
            router.push('/');
          }}
          sx={{ cursor: 'pointer' }}
          display="flex"
        >
          <Box
            width={{ md: '120px', sm: '120px', xs: '80px' }}
            component={'img'}
            src={'/icons/lxdao-logo.svg'}
          />
        </Box>
        <Box
          gap={4}
          display={{ md: 'flex', sm: 'none', xs: 'none' }}
          fontSize={2}
          lineHeight={3}
        >
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router.push('/projects');
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router.push('/buidlers');
            }}
          >
            Buidlers
          </Typography>
          <Link
            href={`https://lxdao.notion.site/`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <Typography>Docs</Typography>
          </Link>
          <Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={(event) => {
                handleGovernanceMenuClick(event);
              }}
              id="governance-menu-trigger"
            >
              <Typography style={{ float: 'left' }}>Governance</Typography>
              <KeyboardArrowDownIcon />
            </Box>
            <Menu
              id="governance-menu"
              anchorEl={governance}
              open={Boolean(governance)}
              onClose={() => {
                handleGovernanceMenuClose();
              }}
              MenuListProps={{ 'aria-labelledby': 'governance-menu-trigger' }}
            >
              <MenuItem
                onClick={() => {
                  handleGovernanceMenuClose();
                }}
              >
                <Link
                  href={`/LXPAnnouncement`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  LXP Announcement
                </Link>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleGovernanceMenuClose();
                }}
              >
                <Link
                  href={`https://forum.lxdao.io/c/governance/weekly/11`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  Weekly Update
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleGovernanceMenuClose();
                }}
              >
                <Link
                  href={`https://forum.lxdao.io/c/governance/monthly-ama/12`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  Monthly AMA
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box display="flex" gap="40px">
          <OnBoardingAlertBtn />
          <ConnectWalletButton />
        </Box>

        <MenuIcon
          sx={{
            display: { md: 'none', sm: 'block', xs: 'block' },
            cursor: 'pointer',
          }}
          onClick={toggleDrawer(true)}
        />
        <SwipeableDrawer
          anchor="top"
          open={openMenu}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <HiddenMenu />
        </SwipeableDrawer>
      </Box>
    </>
  );
};

export default Header;
