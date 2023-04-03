import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {Box} from '@mui/material';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    height: '245px',
    width: '245px',
    perspective: '1000px',
  },
  item: {
    position: 'absolute',
    width: 'calc(100% - 40px)',
    height: 'calc(100% - 40px)',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '48px',
    color: '#555',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    transition: 'transform 0.5s ease-in-out',
  },
  item1: {
    transform: 'translateZ(-200px) rotateY(0deg)',
    zIndex: 4,
  },
  item2: {
    transform: 'translateZ(-150px) rotateY(30deg)',
    zIndex: 3,
  },
  item3: {
    transform: 'translateZ(-100px) rotateY(60deg)',
    zIndex: 2,
  },
  item4: {
    transform: 'translateZ(-50px) rotateY(90deg)',
    zIndex: 1,
  },
}));

const Carousel = () => {
  const classes = useStyles();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleItemClick = (event, idx) => {
    event.stopPropagation(); // 防止 Carousel 容器也捕获 click 事件
    setSelectedIdx(idx);
  };

  return (
      <Box className={classes.container}>
        <Box
            className={`${classes.item} ${classes.item4}`}
            onClick={(event) => handleItemClick(event, 3)}
        >
          {`Item 4`}
        </Box>
        <Box
            className={`${classes.item} ${classes.item3}`}
            onClick={(event) => handleItemClick(event, 2)}
        >
          {`Item 3`}
        </Box>
        <Box
            className={`${classes.item} ${classes.item2}`}
            onClick={(event) => handleItemClick(event, 1)}
        >
          {`Item 2`}
        </Box>
        <Box
            className={`${classes.item} ${classes.item1}`}
            onClick={(event) => handleItemClick(event, 0)}
        >
          {`Item 1`}
        </Box>
      </Box>
  );
};

export default Carousel;
