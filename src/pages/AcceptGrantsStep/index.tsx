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

import {getGrants} from '@/api';
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
  const {appId, tokenToGetGrants} = useAuthData();

  const {
    data: grantsData,
    loading: isLoadingGrants,
    error: errorGettingGrants,
  } = useRequest(() => getGrants(appId, tokenToGetGrants), {
    onSuccess: ({grants, isAlreadyGranted}) => {
      console.log({grants, isAlreadyGranted});
      // setPassword(params[0] as string);
      // setTokenToGetGrants(token);
      // alert(
      //   `The password has been successfully sent. The backend returned token "${token}"`,
      // );
    },
    // onError: err => {
    //   setError('password', {type: 'custom', message: err.message});
    // },
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

  if (errorGettingGrants) {
    return (
      <StepPageLayout title="Разрешить доступ">
        <Alert severity="error">{errorGettingGrants.message}</Alert>
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
                <ListItem sx={{display: 'list-item'}}>
                  <Typography sx={textStyles}>{grant}</Typography>
                </ListItem>
              ))}
            </List>
          </Stack>

          <Button color={'primary'} variant="contained">
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
