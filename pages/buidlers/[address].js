/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Link,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Tooltip,
} from '@mui/material';
import Confetti from 'react-confetti';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useWindowSize from 'react-use/lib/useWindowSize';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useContract, useAccount, useSigner } from 'wagmi';
import * as bs58 from 'bs58';
import { Img3 } from '@lxdao/img3';

import Layout from '@/components/Layout';
import CopyText from '@/components/CopyText';
import Container from '@/components/Container';
import ProfileForm from '@/components/ProfileForm';
import useBuidler from '@/components/useBuidler';
import useMate from '@/components/useMate';
import Skills from '@/components/Skills';
import { formatAddress } from '@/utils/utility';
import API from '@/common/API';
import { getEtherScanDomain, getOpenSeaDomain } from '@/utils/utility';
import { contractInfo } from '@/components/ContractsOperation';
import BuidlerContacts from '@/components/BuidlerContacts';
import Tag from '@/components/Tag';
import showMessage from '@/components/showMessage';
import Project from '@/components/Project';
import { getIpfsCid, groupBy } from '@/utils/utility';
import LXButton from '@/components/Button';
import WorkingGroupCard from '@/components/WorkingGroupCard';
import { BuidlerCard } from '../buidlers';

function totalLXPoints(record) {
  if (!record.lxPoints || !record.lxPoints.length) {
    return 0;
  }
  var lxPointsGroup = groupBy(record.lxPoints, 'unit');
  return Object.keys(lxPointsGroup)
    .map((key) => {
      const total = lxPointsGroup[key].reduce((total, point) => {
        if (point.status != 'RELEASED') {
          return total;
        }
        if (point.operator === '+') {
          return total + point.value;
        }
        if (point.operator === '-') {
          return total - point.value;
        }
        return total;
      }, 0);
      return `${total} LXP`;
    })
    .join(' + ');
}

function LXPointsTable({ points }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        '&.MuiPaper-root': {
          overflowX: 'unset',
        },
        boxShadow: 'none',
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingLeft: 0 }} width="15%" align="left">
              <Typography color="#666F85" variant="body2" fontWeight="400">
                Remuneration
              </Typography>
            </TableCell>
            <TableCell width="20%" align="left">
              <Typography color="#666F85" variant="body2" fontWeight="400">
                Reason
              </Typography>
            </TableCell>
            <TableCell width="15%" align="left">
              <Typography color="#666F85" variant="body2" fontWeight="400">
                Source
              </Typography>
            </TableCell>
            <TableCell width="15%" align="left">
              <Typography
                sx={{
                  width: '89px',
                }}
                color="#666F85"
                variant="body2"
                fontWeight="400"
              >
                Release Time
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingRight: 0 }} width="15%" align="right">
              <Typography
                sx={{
                  width: '110px',
                }}
                color="#666F85"
                variant="body2"
                fontWeight="400"
              >
                Transaction Link
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {points.map((point) => {
            let pointStatus = point.status;
            if (point.status === 'RELEASED') {
              pointStatus = point.updatedAt.split('T')[0];
            } else if (point.status !== 'REJECTED') {
              pointStatus = 'PENDING';
            }
            return (
              <TableRow
                key={point.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: '0.5px solid #E5E5E5',
                }}
              >
                <TableCell
                  sx={{ color: '#101828', paddingLeft: 0 }}
                  component="th"
                  scope="row"
                >
                  <Typography variant="body1" fontWeight="600">
                    {`${point.value} LXP`}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: '#101828' }} align="left">
                  <Tooltip title={point.reason}>
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: { xs: '150px', sm: '300px' },
                      }}
                      variant="body2"
                      fontWeight="400"
                    >
                      {point.reason}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ color: '#101828' }} align="left">
                  {point.source}
                </TableCell>
                <TableCell sx={{ color: '#101828' }} align="left">
                  <Typography
                    sx={{
                      width: '89px',
                    }}
                    variant="body2"
                    fontWeight="400"
                  >
                    {pointStatus}
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingRight: 0 }} align="right">
                  <Link
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                    href={`https://${getEtherScanDomain()}/tx/${point.hash}`}
                  >
                    <Typography
                      sx={{
                        width: '110px',
                      }}
                      color="#36AFF9"
                      variant="body1"
                      fontWeight="400"
                    >
                      {point.status == 'RELEASED' && 'View'}
                    </Typography>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ipfsToBytes(ipfsURI) {
  const ipfsHash = ipfsURI.replace('ipfs://', '');

  return bs58.decode(ipfsHash).slice(2);
}

function BuidlerDetails(props) {
  const record = props.record;
  const { address, isConnected } = useAccount();

  const [_loadingMates, mates] = useMate(record.address);
  const [_loading, currentViewer] = useBuidler(address);
  const { data: signer } = useSigner();
  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [minting, setMinting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [txResOpen, setTxResOpen] = useState(false);
  const [tx, setTx] = useState(null);
  const [txRes, setTxRes] = useState(null);

  // tokenId on chain
  const [tokenId, setTokenId] = useState(null);
  // ipfsURL on chain
  const [ipfsURLOnChain, setIpfsURLOnChain] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(async () => {
    if (!signer) {
      return;
    }
    if (isConnected && address === record.address) {
      await getToken(address);
    }
  }, [isConnected, signer]);

  const getToken = async (address) => {
    let result = await contract.balanceOf(address);
    if (result.toNumber() === 0) {
      return;
    }

    const tokenId = await contract.tokenIdOfOwner(address);
    setTokenId(tokenId.toNumber());
    await getOnChainIpfsURL(tokenId);
  };

  const getOnChainIpfsURL = async (tokenId) => {
    const result = await contract.tokenURI(tokenId);
    if (result && result.length > 0) {
      setIpfsURLOnChain(result);
    }
  };

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
        props.refresh();
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to mint',
        body: err.message,
      });
    }
    setMinting(false);
  };

  const enableMint = async () => {
    try {
      const enableMintRes = await API.post(
        `/buidler/${record.address}/enableMint`
      );
      const data = enableMintRes.data.data;
      alert('Success!');
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to enable mint access',
        body: err.message,
      });
    }
  };

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
      props.refresh();
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to update profile',
        body: err.message,
      });
    }
    setUpdating(false);
  };

  const projects = record.projects.filter((project) => {
    return project.status === 'ACTIVE';
  });

  const buddies = record.buddies.map((buddy) => buddy.address);
  const isBuddyChecking = buddies.includes(address);

  const createdAt =
    record.createdAt &&
    new Date(Date.parse(record.createdAt)).toDateString().split(' ');

  const handleAccordionOnChange = (e, value) => {
    setAccordionOpen(value);
  };

  return (
    <Container paddingY={{ md: 12, xs: 8 }}>
      {address === record.address && record.status === 'PENDING' && (
        <Box marginTop={4}>
          <Alert severity="success">
            Welcome LXDAO. Please fill up the form first, and your Buddy will
            enable your Mint access on the Onboarding Session. Thanks.
          </Alert>
          <Box
            display="flex"
            justifyContent="center"
            marginTop={4}
            marginBottom={4}
          >
            <LXButton width="200px" disabled={true} variant="gradient">
              {minting ? 'Minting Builder Card...' : 'Mint Builder Card'}
            </LXButton>
          </Box>
          <Box display="flex" justifyContent="center" marginBottom={6}>
            <Typography variant="body1" fontWeight="400">
              We will arrange on-boarding as soon as possible and help you mint
              buidler card
            </Typography>
          </Box>
        </Box>
      )}
      {address === record.address && record.status === 'READYTOMINT' && (
        <Box marginTop={4}>
          <Alert severity="info">
            Welcome LXDAO. Your Buidler Card is Ready to Mint.
          </Alert>
          <Box
            display="flex"
            justifyContent="center"
            marginTop={4}
            marginBottom={4}
          >
            <LXButton
              width="220px"
              variant="gradient"
              onClick={() => {
                mint();
              }}
            >
              {minting ? 'Minting Builder Card...' : 'Mint Builder Card'}
            </LXButton>
          </Box>
        </Box>
      )}
      {isBuddyChecking && record.status === 'PENDING' && (
        <Box marginTop={4}>
          <Alert severity="info">Enable Mint Access</Alert>
          <Box marginTop={2} marginBottom={2}>
            <Button
              onClick={() => {
                enableMint();
              }}
              variant="outlined"
            >
              Enable Mint Access
            </Button>
          </Box>
        </Box>
      )}
      {tx && (
        <Dialog
          maxWidth="383px"
          onClose={(event) => {
            setTxOpen(false);
          }}
          open={txOpen}
        >
          <Box
            sx={{
              borderadius: '6px',
              background: '#fff',
              width: '383px',
              height: '232px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box component={'img'} src={'/icons/setting.svg'} />
            <Typography
              variant="body1"
              fontWeight="500"
              textAlign="center"
              color="#000"
              marginTop={2}
              marginBottom={2}
            >
              Minting...
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                fontWeight: '400',
                color: '#666F85',
              }}
            >
              tx:{' '}
              <Link
                target="_blank"
                sx={{ wordBreak: 'break-all' }}
                href={`https://${getEtherScanDomain()}/tx/${tx.hash}`}
              >
                {tx.hash}
              </Link>
            </Box>
          </Box>
        </Dialog>
      )}

      {txRes && (
        <Dialog
          maxWidth="383px"
          onClose={(event) => {
            setTxResOpen(false);
          }}
          open={txResOpen}
        >
          <Box
            sx={{
              borderadius: '6px',
              background: '#fff',
              width: '383px',
              height: '532.8px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box component={'img'} src={'/icons/check.svg'} />
            <Typography
              variant="body1"
              fontWeight="500"
              color="#000"
              textAlign="left"
              marginTop={2}
            >
              Congratulations, LXDAO Buidler card Mint succeeded！
            </Typography>
            <Box marginTop={3} marginBottom={3} margin="auto">
              <img
                crossOrigin="anonymous"
                style={{ display: 'block', width: 271 }}
                src={`${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`}
                alt=""
              />
            </Box>
            <Box
              sx={{ display: 'inline-block', color: '#666F85' }}
              marginBottom={3}
            >
              Go To{' '}
              <Link
                target="_blank"
                sx={{ wordBreak: 'break-all' }}
                href={`https://${getOpenSeaDomain()}/account`}
              >
                OpenSea
              </Link>{' '}
              To View
            </Box>
            <Box
              sx={{
                display: 'inline-block',
                fontWeight: '400',
                color: '#666F85',
              }}
              marginBottom={3}
            >
              tx:{' '}
              <Link
                target="_blank"
                sx={{ wordBreak: 'break-all' }}
                href={`https://${getEtherScanDomain()}/tx/${
                  txRes.transactionHash
                }`}
              >
                {txRes.transactionHash}
              </Link>
            </Box>
            <Box width="100%" display="flex" justifyContent="flex-end">
              <LXButton
                width="94px"
                variant="gradient"
                onClick={() => {
                  handleTxResClose();
                }}
              >
                OK
              </LXButton>
            </Box>
          </Box>
        </Dialog>
      )}
      <Box
        display="flex"
        flexDirection={{
          md: 'row',
          xs: 'column',
        }}
        gap="24px"
      >
        {/* left section*/}
        <Box width={{ md: '300px', sm: 'auto', xs: 'auto' }}>
          <Box
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            display="flex"
            padding={3}
          >
            <Box width="100%">
              <Box
                width="252px"
                height="252px"
                border="0.5px solid #D0D5DD"
                borderRadius="6px"
                overflow="hidden"
                margin="auto"
              >
                <Img3
                  src={
                    getIpfsCid(record.avatar)
                      ? `ipfs://${getIpfsCid(record.avatar)}`
                      : '/images/placeholder.jpeg'
                  }
                  style={{ display: 'block', width: 252, height: 252 }}
                  timeout={3000}
                />
              </Box>
              <Typography
                variant="h5"
                fontWeight="500"
                textAlign="center"
                color="#000"
                marginTop={3}
                marginBottom={1}
              >
                {record.name}
              </Typography>
              <Box display="flex" justifyContent="center">
                <CopyText
                  textAlign="center"
                  copyTextOriginal={record.address}
                  copyText={formatAddress(record.address)}
                />
              </Box>
              <Divider
                sx={{
                  marginTop: '24px',
                  borderColor: '#E5E5E5',
                }}
              />
              {record.description && (
                <Box marginTop={3}>
                  <Typography sx={{ wordBreak: 'break-all' }}>
                    {record.description}
                  </Typography>
                </Box>
              )}
              {record.role?.length > 0 && (
                <Grid marginTop={3} item>
                  <Box display="flex" flexWrap="wrap">
                    {record.role.map((item) => {
                      return <Tag key={item} text={item} />;
                    })}
                  </Box>
                </Grid>
              )}
              {record.contacts && (
                <Box
                  marginTop={2}
                  display="flex"
                  flexWrap="wrap"
                  alignItems="flex-start"
                  width="176px"
                >
                  <BuidlerContacts
                    sx={{ flexWrap: 'wrap' }}
                    contacts={record.contacts}
                  />
                </Box>
              )}
              {record.role?.length > 0 &&
                record.description &&
                record.contacts && (
                  <Divider
                    sx={{
                      marginTop: '24px',
                      borderColor: '#E5E5E5',
                    }}
                  />
                )}
              {createdAt.length === 4 && (
                <Box paddingTop={3} display="flex" justifyContent="center">
                  <Typography>{`Joined ${createdAt[1]} ${createdAt[3]}`}</Typography>
                </Box>
              )}
              {address === record.address && (
                <Divider
                  sx={{
                    marginTop: 2,
                    marginBottom: 3,
                    borderColor: '#E5E5E5',
                  }}
                />
              )}
              <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
                {address === record.address ? (
                  <LXButton
                    onClick={() => {
                      setVisible(true);
                    }}
                    variant="outlined"
                  >
                    Edit
                  </LXButton>
                ) : null}
                {address === record.address &&
                  !!ipfsURLOnChain &&
                  ipfsURLOnChain !== record.ipfsURI && (
                    <LXButton
                      onClick={async () => {
                        setSyncing(true);
                        try {
                          const syncInfoRes = await API.post(
                            `/buidler/${address}/syncInfo`
                          );
                          if (syncInfoRes?.data?.status !== 'SUCCESS') {
                            throw new Error(syncInfoRes?.data.message);
                          }
                          const { signature, ipfsURI } =
                            syncInfoRes?.data?.data || {};
                          const tx = await contract.updateMetadata(
                            tokenId,
                            ipfsToBytes(ipfsURI),
                            signature
                          );
                          await tx.wait();
                          await getToken(address);
                          // todo add tx to the page
                        } catch (err) {
                          showMessage({
                            type: 'error',
                            title: 'Failed to update metadata',
                            body: err.message,
                          });
                        }
                        setSyncing(false);
                      }}
                      color="#36AFF9"
                      variant="outlined"
                      disabled={syncing}
                    >
                      {syncing ? 'Syncing...' : 'Sync on Chain'}
                    </LXButton>
                  )}
                {address === record.address &&
                record.role.includes('Onboarding Committee') ? (
                  <LXButton
                    onClick={async () => {
                      const newAddress = window.prompt('New joiner address');
                      const data = await API.post(`/buidler`, {
                        address: newAddress,
                      });
                      const result = data?.data;
                      if (result.status === 'SUCCESS') {
                        alert('created!');
                      }
                    }}
                    variant="outlined"
                  >
                    Onboarding
                  </LXButton>
                ) : null}

                {/* todo only show this button to Onboarding Committee */}
                {address !== record.address && (
                  <Divider
                    sx={{
                      width: '100%',
                      marginTop: 2,
                      marginBottom: 3,
                      borderColor: '#E5E5E5',
                    }}
                  />
                )}
                {currentViewer &&
                  currentViewer.role.includes('Onboarding Committee') && (
                    <LXButton
                      onClick={async () => {
                        const data = await API.post(
                          `/buidler/${record.address}/uploadIPFS`
                        );
                        const result = data?.data;
                        if (result.status === 'SUCCESS') {
                          alert('Synced!');
                        }
                      }}
                      variant="outlined"
                    >
                      Sync to IPFS
                    </LXButton>
                  )}
              </Box>
            </Box>
          </Box>
          {record.buddies?.length > 0 && (
            <Link
              target="_blank"
              href={`/buidlers/${record.buddies[0].address}`}
              sx={{
                textDecoration: 'none',
              }}
            >
              <Box
                marginTop={3}
                border="0.5px solid #D0D5DD"
                borderRadius="6px"
                display="flex"
                justifyContent="space-between"
                padding="20px 24px"
              >
                <Box display="flex" alignItems="center">
                  Buddy
                </Box>

                <Box
                  width="80px"
                  height="80px"
                  border="0.5px solid #D0D5DD"
                  borderRadius="6px"
                  overflow="hidden"
                >
                  <img
                    style={{ display: 'block', width: 80, height: 80 }}
                    src={record.buddies[0].avatar || '/images/placeholder.jpeg'}
                    alt=""
                  />
                </Box>
              </Box>
            </Link>
          )}
          {record.status === 'ACTIVE' ? (
            <Link
              target="_blank"
              href={`https://opensea.io/collection/lxdaobuidler`}
              sx={{
                textDecoration: 'none',
              }}
            >
              <Box
                marginTop={2}
                width={{ lg: '300px', sm: 'auto', xs: '350px' }}
                display="flex"
                justifyContent="center"
              >
                <img
                  crossOrigin="anonymous"
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                  }}
                  src={`${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`}
                  alt=""
                />
              </Box>
            </Link>
          ) : null}
        </Box>
        {/* right senction */}
        <Box boxSizing="border-box" flex="1">
          <Box display="flex" flexDirection="column">
            <Accordion
              onChange={handleAccordionOnChange}
              sx={{
                '&.Mui-expanded': {
                  minHeight: { md: 128, sm: 200 },
                },
                '&.MuiPaper-root': {
                  border: '0.5px solid #D0D5DD',
                  boxShadow: 'none',
                },
              }}
            >
              <AccordionSummary
                height={{ md: '128px', sm: '200px' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  '&.MuiAccordionSummary-root': {
                    height: { sm: '128px !important', xs: '200px !important' },
                    borderRadius: '6px',
                    '.MuiAccordionSummary-expandIconWrapper': {
                      marginTop: { sm: 0, xs: '84px' },
                      display: record?.lxPoints.length ? 'block' : 'none',
                    },
                  },
                }}
              >
                <Box
                  width="100%"
                  display="flex"
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  justifyContent="space-between"
                  flexDirection={{ xs: 'column', md: 'row' }}
                >
                  <Box>
                    <Typography
                      fontWeight="600"
                      variant="body1"
                      color="#101828"
                    >
                      All Remuneration{' '}
                      <Link
                        href="/LXPApplication"
                        target="_blank"
                        sx={{
                          display: 'inline',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        (Apply LXP ->)
                      </Link>
                    </Typography>

                    <Typography
                      marginTop={1}
                      fontWeight="600"
                      variant="h5"
                      color="#36AFF9"
                    >
                      {totalLXPoints(record)}
                    </Typography>
                  </Box>
                  <Box
                    textAlign={{ xs: 'right' }}
                    width={{ xs: '100%', md: 'auto' }}
                    paddingTop={{ xs: '24px', md: 0 }}
                  >
                    <Typography
                      fontWeight="500"
                      variant="body1"
                      color="#0D1320"
                    >
                      {record?.lxPoints.length > 0
                        ? accordionOpen
                          ? 'Put Away'
                          : 'Record List'
                        : null}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  '&.MuiAccordionDetails-root': {
                    height: '235px !important',
                    padding: { sm: '8px 32px 32px 32px', xs: '8px' },
                    overflowY: 'auto',
                    overflowX:
                      record?.lxPoints?.length === 0 ? 'hidden' : 'auto',
                    '&::-webkit-scrollbar': {
                      width: '10px',
                      height: '10px',
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '10px',
                      background: '#dfdfdf',
                    },
                    '&::scrollbar-track': {
                      borderRadius: 0,
                      background: '#dfdfdf',
                    },
                  },
                }}
              >
                <LXPointsTable maxHeight="235px" points={record.lxPoints} />
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box flex="1 1" marginTop={3}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            >
              <Box
                border="0.5px solid #D0D5DD"
                borderRadius="6px"
                padding="22px 17px 26.66px 31px"
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    fontWeight="600"
                    variant="body1"
                    marginBottom={2}
                    display="inline-block"
                  >
                    Skills
                  </Typography>
                  <Box display="inline-block">
                    <Typography
                      fontWeight="400"
                      variant="body2"
                      display="inline-block"
                    >
                      <Box
                        width="10px"
                        height="10px"
                        borderRadius="50%"
                        display="inline-block"
                        marginRight={1}
                        marginLeft={1}
                        sx={{ background: '#009FFF' }}
                      ></Box>
                      Senior
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="body2"
                      display="inline-block"
                    >
                      <Box
                        width="10px"
                        height="10px"
                        borderRadius="50%"
                        display="inline-block"
                        marginRight={1}
                        marginLeft={1}
                        sx={{ background: 'rgba(0,159,255,0.7)' }}
                      ></Box>
                      Intermediate
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="body2"
                      display="inline-block"
                    >
                      <Box
                        width="10px"
                        height="10px"
                        borderRadius="50%"
                        display="inline-block"
                        marginRight={1}
                        marginLeft={1}
                        sx={{ background: 'rgba(0,159,255,0.4)' }}
                      ></Box>
                      Jonior
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexWrap="wrap">
                  <Skills skills={record.skills} />
                </Box>
              </Box>
              <Box
                border="0.5px solid #D0D5DD"
                borderRadius="6px"
                padding="22px 17px 26.66px 31px"
                sx={{ height: '100%' }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    variant="body1"
                    marginBottom={2}
                    display="inline-block"
                  >
                    Interests
                  </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap">
                  {record.interests.map((item) => {
                    return (
                      <Tag
                        background="rgba(255,184,0,0.1)"
                        color="#FFB800"
                        key={item}
                        text={item}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box marginTop={3}>
            <Box>
              <Typography
                color="#101828"
                fontWeight="600"
                variant="body1"
                marginBottom={2}
              >
                Project
              </Typography>
            </Box>
            <Box display="flex" marginTop={2}>
              {projects.length ? (
                <Grid container spacing={4}>
                  {projects.map((project) => {
                    return (
                      <Grid item xs={12} md={6} key={project.id}>
                        <Project data={project} />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  height="148px"
                  alignItems="center"
                  border="0.5px solid #D0D5DD"
                  borderRadius="6px"
                  padding={2}
                >
                  <Typography
                    marginTop={{ xs: 0, sm: 2 }}
                    marginBottom={{ xs: '16px', sm: '21px' }}
                    color="#D0D5DD"
                    variant="body1"
                    fontWeight="400"
                  >
                    You have not participated in the project, Go and choose one
                    to join.
                  </Typography>
                  <LXButton size="small" variant="outlined">
                    <Link
                      href={`/projects`}
                      target="_blank"
                      sx={{
                        textDecoration: 'none',
                      }}
                    >
                      View Product List
                    </Link>
                  </LXButton>
                </Box>
              )}
            </Box>
          </Box>

          <Box marginTop={3} marginBottom={3}>
            <Box>
              <Typography
                color="#101828"
                fontWeight="600"
                variant="body1"
                marginBottom={2}
              >
                Working Group
              </Typography>
            </Box>
            <Box display="flex" marginTop={2}>
              {record?.workingGroups?.length ? (
                <Box width="100%">
                  <Grid container spacing={3}>
                    {record?.workingGroups?.length > 0 &&
                      record?.workingGroups?.map((group, index) => {
                        return (
                          <WorkingGroupCard hasBorder key={index} {...group} />
                        );
                      })}
                  </Grid>
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  height="148px"
                  alignItems="center"
                  border="0.5px solid #D0D5DD"
                  borderRadius="6px"
                  padding={2}
                >
                  <Typography
                    marginTop={{ xs: 0, sm: 2 }}
                    marginBottom={{ xs: '16px', sm: '21px' }}
                    color="#D0D5DD"
                    variant="body1"
                    fontWeight="400"
                  >
                    You haven&apos;t joined the workgroup, go and choose one to
                    join
                  </Typography>
                  <LXButton size="small" variant="outlined">
                    <Link
                      href={`https://lxdao.notion.site/95fde886aef24c9ca63b8bae95fa8456`}
                      target="_blank"
                      sx={{
                        textDecoration: 'none',
                      }}
                    >
                      View Working Group
                    </Link>
                  </LXButton>
                </Box>
              )}
            </Box>
          </Box>
          {mates && mates.length > 0 && (
            <Box marginTop={3} marginBottom={3}>
              <Box>
                <Typography
                  color="#101828"
                  fontWeight="600"
                  variant="body1"
                  marginBottom={2}
                >
                  My Buddies
                </Typography>
              </Box>
              <Box display="flex" marginTop={2}>
                <Grid container spacing={2}>
                  {mates.map((mate) => (
                    <Grid key={mate.id} item xs={12} sm={6} lg={4}>
                      <BuidlerCard simpleMode={true} record={mate} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
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
    </Container>
  );
}

// todo load builder on nodejs Muxin
export default function Buidler() {
  const router = useRouter();
  const address = router.query.address;
  const [open, setOpen] = useState(false);
  const { width, height } = useWindowSize();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [loading, record, error, refresh] = useBuidler(address);

  // if (loading) return <Layout>Loading...</Layout>;
  useEffect(() => {
    const newBuidler = sessionStorage?.getItem('newBuidler');
    if (newBuidler) {
      setOpen(true);
      sessionStorage?.removeItem('newBuidler');
    }
  }, []);
  useEffect(() => {
    setSize({
      width: width,
      height: height,
    });
  }, [width, height]);
  if (loading) return null;

  return (
    <Layout title={`${record && record.name} Buidler Profile | LXDAO`}>
      {record ? (
        <>
          <Confetti
            width={size.width}
            height={size.height}
            recycle={false}
            run={open}
          />
          <BuidlerDetails
            refresh={() => {
              refresh();
            }}
            record={record}
          />
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
          paddingY={20}
        >
          <img width="80px" src="/icons/no-records.png" />
          <Typography marginTop={4} color="#D0D5DD" fontSize="16px">
            No Buidler found with the address {address}
          </Typography>
        </Box>
      )}
    </Layout>
  );
}
