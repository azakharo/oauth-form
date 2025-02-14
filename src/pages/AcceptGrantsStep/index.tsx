import {
  Alert,
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
import {COLOR__SECONDARY} from '@/theme/colors';

const textStyles = {
  fontWeight: 400,
  fontSize: 18,
  lineHeight: '23px',
  color: '#4D4D4D',
};

export const AcceptGrantsStep = () => {
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

      window.location.replace(`${redirectUrl}?${searchParams.toString()}`);
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
      <StepPageLayout title="Разрешить доступ">
        <Stack spacing={2}>
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

          <Button
            color={'primary'}
            variant="contained"
            onClick={() => {
              runGettingAuthCode(appId, tokenToGetGrants);
            }}
            disabled={isLoadingAuthCode}
          >
            Подтвердить
          </Button>

          <Button color={'primary'} variant="outlined">
            Отклонить
          </Button>
        </Stack>
      </StepPageLayout>
    );
  }

  return null;
};
