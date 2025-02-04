import {memo} from 'react';
import {Box} from '@mui/material';

const areaColor = '#e2deed';

const AuthPage = () => {
  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'grid',
        backgroundColor: areaColor,
      }}
    >
      Hello World
    </Box>
  );
};

export default memo(AuthPage);
