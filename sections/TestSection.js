import React from 'react';
import { useRouter } from 'next/router';

import {Box, Typography, Link, Card, CardMedia} from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import DownloadButton from '@/components/Download';
import {makeStyles} from "@mui/styles";

const useStyles=makeStyles(() => ({
    test:{
        /*  '& .softwarePreview':{

            position:'absolute',
            width: '863px',
            height: '471px',
            left: '305.5px',
            top: '697.73px',

            filter: 'drop-shadow(0px 4px 60px rgba(41, 201, 223, 0.1))',

            /!*斜*!/
            transform: 'matrix(1, 0.01, 0.12, 0.99, 0, 0)',

          },
      */
        '& .softwareImage':{
            backgroundColor:'black',
            border: '0 dashed #F9D931',
            position: 'flex',
            maxWidth: '115%',
            maxHeight: '100%',
            width:' 960.72px',
            height: '576.66px',
            zIndex:'1',

            background: 'url(/images/background-1.jpg)',
            /*斜*/
            /* mixBlendMode: 'normal',*/
            transform: 'matrix(1, 0.01, 0.04, 0.99, 0, 0)',

            '& .nftImage':{

                boxSizing: 'border-box',
                position: 'absolute',
                width: '297.14px',
                height: '297.81px',
                left: '583.72px',
                top: '81.25px',

                background: '#FFFBE5',


                /*斜*/
                /* border: '10px dashed #F9D931',*/
                transform: 'matrix(1, 0.01, 0.04, 0.99, 0, 0)',

            }

        },


    }



}));

const TestSection = () => {
    const styles = useStyles();
    const router = useRouter();

    return (
        <Container
            minHeight={{ md: '800px', xs: '660px' }}
            display="flex"
            flexDirection={{ lg: 'row', xs: 'column' }}
            /* justifyContent="flex-start"*/
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            gap={{ lg: '120px', xs: '40px' }}
        >

            <Box
                display="flex"
                flexDirection="column"
                gap={6}
                alignItems="center"
                textAlign="center"
            >
                <Box   className={styles.test}>
                    <Box  width={{ md: 'none', sm: 'block', xs: 'block' }}>
                        <Box
                            className="softwareImage"
                            /*className={styles.test}*/

                          /*  width={{ sm: '800px', xs: '400px' }}*/
                        >
                            <Box
                                component="img"
                                className="nftImage"
                                /* className={styles.nftImage}*/
                              /*  width={{ sm: '100px', xs: '20px' }}*/
                                src="/images/yootou.png" />
                        </Box>

                    </Box>
                </Box>
               {/* <Card>
                    <CardMedia
                        component="img"
                        sx={{ width: 800 ,xs: '400px'}}
                        image="/images/background-1.jpg"
                        alt="Live from space album cover"
                    >

                    </CardMedia>

                </Card>*/}


                {/* <ActivityNotification /> */}
            </Box>
        </Container>
    );
};

export default TestSection;
