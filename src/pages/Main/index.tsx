import {memo} from 'react';
import {Box} from '@mui/material';

import errorImg from '@/assets/images/sad-cloud.png';

const areaColor = '#e2deed';

const asideMainCommonStyles = {
  minHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  fontWeight: 'bold',
};

const Main = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'grid',
        gridTemplateAreas: `"header header"
      "sidebar main"
      "footer footer"`,
        gridTemplateColumns: 'minmax(200px, 20%) 1fr',
        gridTemplateRows: '3rem 1fr 3rem',
        gap: '1rem',

        '&> *': {
          backgroundColor: areaColor,
        },
      }}
    >
      <Box
        component="header"
        sx={{
          gridArea: 'header',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
        }}
      >
        <Box
          component="img"
          sx={{
            height: '2rem',
            marginRight: 'auto',
          }}
          src={errorImg}
          alt="logo"
        />
      </Box>
      <Box
        component="aside"
        sx={{
          gridArea: 'sidebar',
          ...asideMainCommonStyles,
        }}
      >
        Sidebar
      </Box>
      <Box
        component="main"
        sx={{
          gridColumn: 'main',
          ...asideMainCommonStyles,
        }}
      >
        Here will be the content
      </Box>
      <Box
        component="footer"
        sx={{
          gridArea: 'footer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        Footer
      </Box>
    </Box>
  );
};

export default memo(Main);
