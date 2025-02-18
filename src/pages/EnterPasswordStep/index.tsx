import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoadingButton} from '@mui/lab';
import {Stack} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';
import {object, string} from 'yup';

import {enterPassword} from '@/api';
import PasswordInput from '@/components/PasswordInput';
import {StepPageLayout} from '@/components/StepPageLayout';
import {ROUTE__ACCEPT_GRANTS_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';

const v8nSchema = object().shape({
  password: string().required('Введите пароль'),
});

export const EnterPasswordStep = () => {
  const navigate = useNavigate();
  const {password, setPassword, tokenToEnterPassword, setTokenToGetGrants} =
    useAuthData();

  const {control, handleSubmit, setError} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      password,
    },
  });

  const {loading, run, params} = useRequest(enterPassword, {
    manual: true,
    onSuccess: token => {
      setPassword(params[0] as string);
      setTokenToGetGrants(token);
      navigate(ROUTE__ACCEPT_GRANTS_STEP);
    },
    onError: err => {
      setError('password', {type: 'custom', message: err.message});
    },
  });

  return (
    <StepPageLayout title="Введите пароль" showBackButton>
      <form
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            run(values.password, tokenToEnterPassword);
          });

          void theReturnedFunc(event);
        }}
        noValidate
      >
        <Stack spacing={4}>
          <PasswordInput
            name={'password'}
            label={'Пароль'}
            // Technically all work fine.
            // If replace PasswordInput (which is TextFieldElement) with TextFieldElement,
            // then will be no any TS error.
            // Looks like PasswordInput should be Generic with FormValues type param.
            // But don't want to spend time for this.
            // Probably the following link could help:
            // https://github.com/react-hook-form/react-hook-form/issues/4965#issuecomment-826993553
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            control={control}
            fullWidth
            autoFocus
            autoComplete="current-password"
          />

          <LoadingButton type={'submit'} color={'primary'} loading={loading}>
            Далее
          </LoadingButton>
        </Stack>
      </form>
    </StepPageLayout>
  );
};
