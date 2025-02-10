import {FC, PropsWithChildren} from 'react';
import {Box, Typography} from '@mui/material';

import Logo from './logo.svg?react';

import {useIsDesktop} from '@/hooks/responsive';

interface Props {
  title: string;
}

export const StepPageLayout: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  const isDesktop = useIsDesktop();

  const content = (
    <>
      {/* This container is necessary to align the logo and title center horizontally */}
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
    </>
  );

  if (isDesktop) {
    return (
      <Box display="flex" sx={{height: '100dvh'}}>
        <Box flex="1 1 0" sx={{backgroundColor: 'green'}}>
          1
        </Box>

        <Box
          flex="1 1 0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          <Box flex="0 1 400px">{content}</Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{height: '100dvh'}}
      p={4}
    >
      <Box flex="0 1 400px">{content}</Box>
    </Box>
  );
};
