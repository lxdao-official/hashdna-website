import React from 'react';
import { Box } from '@mui/material';
import { Carousel } from '@mui/lab';

function BackgroundCarousel() {
    return (
        <Box position="relative" height="100vh">
            <img
                src={'props.backgroundImageUrl'}
                alt="Background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Carousel>
                    {/* Here goes the slides */}
                </Carousel>
            </div>
        </Box>
    );
}

export default BackgroundCarousel;
