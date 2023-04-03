import React from 'react';
import { makeStyles } from '@mui/styles';
import {Box, Grid} from '@mui/material';
import Carousel from './Carousel';
import CarouselGroupsData from '@/common/content/CarouselGroups';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        height: '576px',
        width: '923px',
        backgroundImage: `url(/images/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginBottom: theme.spacing(4),
    },
    carouselContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translate(-50%, -50%)',
    },
}));

const ImageCarousel = () => {
    const classes = useStyles();

    return (
        <Box  xs={12} sm={6} md={4} lg={4}>
            <Box
                backgroundColor="#F5F5F5"
                height="100x"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="6px 6px 0 0"
                sx={{ border: 'none' }}
            >
                <Box component="img" src='/images/background.jpg' />
            </Box>

        </Box>



        /*<Box className={classes.container}>
            <Box className={classes.carouselContainer}>



                {/!*<Carousel/>*!/}


                <Grid container spacing={2}>
                    {CarouselGroupsData.length > 0 &&
                    CarouselGroupsData.map((group, index) => {
                        return <Carousel key={index} {...group} />;
                    })}
                </Grid>


            </Box>
        </Box>*/
    );
};

export default ImageCarousel;
