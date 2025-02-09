import {FC, PropsWithChildren} from 'react';
import {Box, Container, Typography} from '@mui/material';

import Logo from './logo.svg?react';

interface Props {
  title: string;
}

export const StepPageLayout: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => (
  <Container style={{maxWidth: 400}}>
    <Box
      sx={{
        height: '100dvh',
      }}
      display="flex"
      alignItems="center"
    >
      <Box width="100%">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo width={210} height={'100%'} style={{marginBottom: 32}} />

          <Typography
            mb={4}
            sx={{
              fontSize: 28,
              fontWeight: 500,
              lineHeight: '28px',
            }}
          >
            {title}
          </Typography>
        </Box>

        {children}
      </Box>
    </Box>
  </Container>
);
