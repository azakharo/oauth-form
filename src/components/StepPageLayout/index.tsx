import {FC, PropsWithChildren} from 'react';
import {useNavigate} from 'react-router-dom';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import {Box, IconButton, Stack, Typography} from '@mui/material';

import catImage from './cat.png';
import Logo from './logo.svg?react';

import {useIsDesktop, useIsTablet} from '@/hooks/responsive';
import {COLOR__GRAY} from '@/theme/colors';

interface Props {
  title: string;
  subTitle?: string;
  showBackButton?: boolean;
}

export const StepPageLayout: FC<PropsWithChildren<Props>> = ({
  title,
  subTitle,
  showBackButton,
  children,
}) => {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const navigate = useNavigate();

  const content = (
    <>
      {/* This container is necessary to align the logo and title center horizontally */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isTablet ? 'center' : 'flex-start'}
      >
        <Logo width={210} height={'100%'} style={{marginBottom: 32}} />

        <Stack
          mb={5}
          alignItems={isTablet ? 'center' : 'flex-start'}
          sx={{position: 'relative', width: '100%'}}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            {showBackButton && (
              <IconButton
                sx={{
                  color: '#292D32',
                  ...(isTablet
                    ? {
                        position: 'absolute',
                        left: 0,
                      }
                    : {}),
                }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <WestOutlinedIcon />
              </IconButton>
            )}

            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 500,
                lineHeight: '28px',
              }}
            >
              {title}
            </Typography>
          </Stack>

          {subTitle && (
            <Typography
              align={isTablet ? 'center' : undefined}
              sx={{color: COLOR__GRAY}}
              mt={1.5}
            >
              {subTitle}
            </Typography>
          )}
        </Stack>
      </Box>

      {children}
    </>
  );

  if (isDesktop) {
    return (
      <Box display="flex" sx={{height: '100dvh'}}>
        <Box
          flex="1 1 0"
          sx={{
            backgroundImage: `url(${catImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></Box>

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
