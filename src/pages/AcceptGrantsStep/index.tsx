import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';

import {getAuthCode, getGrants} from '@/api';
import {StepPageLayout} from '@/components/StepPageLayout';
import {useAuthData} from '@/contexts/AuthDataContext';
import {useIsTablet} from '@/hooks/responsive';
import {COLOR__MAIN_BLACK, COLOR__SECONDARY} from '@/theme/colors';

const textStyles = {
  fontWeight: 400,
  fontSize: 18,
  lineHeight: '23px',
  color: '#4D4D4D',
};

export const AcceptGrantsStep = () => {
  const navigate = useNavigate();
  const isTablet = useIsTablet();
  const {appId, tokenToGetGrants, redirectUrl, redirectStateParam} =
    useAuthData();

  const {
    loading: isLoadingAuthCode,
    run: runGettingAuthCode,
    error: errorGettingAuthCode,
  } = useRequest(getAuthCode, {
    manual: true,
    onSuccess: authCode => {
      const searchParams = new URLSearchParams();
      searchParams.append('code', authCode);
      searchParams.append('state', redirectStateParam);

      window.location.href = `${redirectUrl}?${searchParams.toString()}`;
    },
  });

  const {
    data: grantsData,
    loading: isLoadingGrants,
    error: errorGettingGrants,
  } = useRequest(() => getGrants(appId, tokenToGetGrants), {
    onSuccess: ({isAlreadyGranted}) => {
      if (isAlreadyGranted) {
        runGettingAuthCode(appId, tokenToGetGrants);
      }
    },
  });

  if (isLoadingGrants) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{height: '100dvh'}}
        p={4}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const error = errorGettingGrants || errorGettingAuthCode || null;
  if (error) {
    return (
      <StepPageLayout title="Разрешить доступ">
        <Alert severity="error">{error.message}</Alert>
      </StepPageLayout>
    );
  }

  if (grantsData && !grantsData.isAlreadyGranted) {
    return (
      <StepPageLayout title="Разрешить доступ" showBackButton>
        <Stack spacing={2}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Avatar src={grantsData.imageUrl} variant="rounded" />

            <Typography
              sx={{
                ...textStyles,
                color: COLOR__MAIN_BLACK,
              }}
            >
              {grantsData.description}
            </Typography>
          </Stack>

          <Typography sx={textStyles}>
            Приложению для дальнейшей работы требуется доступ к персональным
            данным пользователя.
          </Typography>

          <Stack>
            <Typography
              sx={{
                ...textStyles,
                color: COLOR__SECONDARY,
              }}
            >
              Список запрашиваемых данных:
            </Typography>

            <List sx={{listStyleType: 'disc', pl: 4}}>
              {grantsData.grants.map(grant => (
                <ListItem key={grant} sx={{display: 'list-item'}}>
                  <Typography sx={textStyles}>{grant}</Typography>
                </ListItem>
              ))}
            </List>
          </Stack>

          <Stack
            spacing={2}
            direction={isTablet ? 'row' : undefined}
            sx={{
              '& > button': {
                flex: isTablet ? 1 : undefined,
              },
            }}
          >
            <LoadingButton
              color={'primary'}
              onClick={() => {
                runGettingAuthCode(appId, tokenToGetGrants);
              }}
              loading={isLoadingAuthCode}
            >
              Подтвердить
            </LoadingButton>

            <Button
              color={'primary'}
              variant="outlined"
              onClick={() => {
                navigate(-1);
              }}
            >
              Отклонить
            </Button>
          </Stack>
        </Stack>
      </StepPageLayout>
    );
  }

  return null;
};
