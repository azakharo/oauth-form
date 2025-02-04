import {FC, PropsWithChildren} from 'react';
import {Box, Container} from '@mui/material';
import Logo from './logo.svg?react';

export const StepPageLayout: FC<PropsWithChildren> = ({children}) => (
  <Container style={{maxWidth: 400}}>
    <Box
      sx={{
        height: '100dvh',
      }}
      display="flex"
      alignItems="center"
    >
      <Box width="100%">
        <Logo width={210} height={'100%'} style={{marginBottom: 45}} />
        {children}
      </Box>
    </Box>
  </Container>
);
