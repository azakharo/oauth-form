import {FC, PropsWithChildren} from 'react';
import {Box, Container, Typography} from '@mui/material';

import Logo from './logo.svg?react';

import {useIsDesktop, useIsTablet} from '@/hooks/responsive';

interface Props {
  title: string;
}

export const StepPageLayout: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  let backgroundColor;
  if (isDesktop) {
    backgroundColor = 'green';
  } else if (isTablet) {
    backgroundColor = 'blue';
  } else {
    backgroundColor = 'red';
  }

  return (
    <Container style={{maxWidth: 400}}>
      <Box
        sx={{
          height: '100dvh',
          backgroundColor,
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
};
