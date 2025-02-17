import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Alert, Box, Button, Stack, Typography} from '@mui/material';
import useCountDown from 'ahooks/es/useCountDown';
import useMount from 'ahooks/es/useMount';
import useRequest from 'ahooks/es/useRequest';
import {object, string} from 'yup';

import {CodeFormat} from './CodeFormat';

import {enterPhone, enterSmsCode} from '@/api';
import {StepPageLayout} from '@/components/StepPageLayout';
import {ROUTE__ENTER_PASSWORD_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';
import {COLOR__LIGHT_GRAY} from '@/theme/colors';

const codeRegExp = /^\d{4}$/;

const v8nSchema = object().shape({
  code: string()
    .required('Введите код из СМС')
    .matches(codeRegExp, 'СМС код состоит из 4-х цифр'),
});

export const EnterCodeStep = () => {
  const navigate = useNavigate();
  const {
    code,
    setCode,
    tokenToEnterSmsCode,
    setTokenToEnterPassword,
    phone,
    setTokenToEnterSmsCode,
  } = useAuthData();

  const {control, handleSubmit, setError} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      code,
    },
  });

  /////////////////////////////////////////////////////////
  // Send SMS retry

  const [countDownTargetDate, setCountDownTargetDate] = useState<number>();

  const startCountDown = () => {
    setCountDownTargetDate(Date.now() + 60_000);
  };

  const [countdown] = useCountDown({
    targetDate: countDownTargetDate,
  });

  useMount(() => {
    startCountDown();
  });

  const {
    loading: isSendingPhone,
    run: sendPhone,
    error: errorSendingPhone,
  } = useRequest(enterPhone, {
    manual: true,
    onSuccess: token => {
      setTokenToEnterSmsCode(token);
      startCountDown();
    },
    onError: () => {
      startCountDown();
    },
  });

  const resendSmsCode = () => {
    sendPhone(phone);
  };

  // Send SMS retry
  /////////////////////////////////////////////////////////

  const {loading, run, params} = useRequest(enterSmsCode, {
    manual: true,
    onSuccess: token => {
      setCode(params[0] as string);
      setTokenToEnterPassword(token);
      navigate(ROUTE__ENTER_PASSWORD_STEP);
    },
    onError: err => {
      setError('code', {type: 'custom', message: err.message});
    },
  });

  return (
    <StepPageLayout
      title="Введите код"
      subTitle={`Мы отправили вам смс код на номер *${phone.slice(-4)}`}
      showBackButton
    >
      <form
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            run(values.code, tokenToEnterSmsCode);
          });

          void theReturnedFunc(event);
        }}
        noValidate
      >
        <Stack spacing={4}>
          <TextFieldElement
            name={'code'}
            label={'Введите код'}
            control={control}
            fullWidth
            inputProps={{
              autoComplete: 'one-time-code',
            }}
            InputProps={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              inputComponent: CodeFormat,
            }}
            autoFocus
          />

          <Button
            type={'submit'}
            color={'primary'}
            variant="contained"
            disabled={loading}
          >
            Далее
          </Button>
        </Stack>

        {!!countdown && (
          <Typography
            variant="button"
            align="center"
            display="block"
            sx={{color: COLOR__LIGHT_GRAY}}
            mt="22px"
          >
            {`Отправить код повторно через 00:${Math.round(countdown / 1000)
              .toString()
              .padStart(2, '0')}`}
          </Typography>
        )}

        {countdown === 0 && (
          <Button
            variant="text"
            color="secondary"
            fullWidth
            sx={{display: 'block', marginTop: '8px'}}
            onClick={resendSmsCode}
            disabled={isSendingPhone}
          >
            <Typography variant="button" align="center">
              Отправить код повторно
            </Typography>
          </Button>
        )}

        {errorSendingPhone && (
          <Box mt={4}>
            <Alert severity="error">{errorSendingPhone.message}</Alert>
          </Box>
        )}
      </form>
    </StepPageLayout>
  );
};
