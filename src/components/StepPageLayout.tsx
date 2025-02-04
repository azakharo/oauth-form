import {FC, PropsWithChildren} from 'react';
import {Box, Container} from '@mui/material';

export const StepPageLayout: FC<PropsWithChildren> = ({children}) => (
  <Container style={{maxWidth: 400}}>
    <Box
      sx={{
        height: '100dvh',
      }}
      display="flex"
      alignItems="center"
    >
      <Box width="100%">{children}</Box>
    </Box>
  </Container>
);
