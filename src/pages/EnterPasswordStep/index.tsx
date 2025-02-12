import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Stack} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';
import {object, string} from 'yup';

import {enterPassword} from '@/api';
import PasswordInput from '@/components/PasswordInput';
import {StepPageLayout} from '@/components/StepPageLayout';
import {useAuthData} from '@/contexts/AuthDataContext';

const v8nSchema = object().shape({
  password: string().required('Введите пароль'),
});

export const EnterPasswordStep = () => {
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
      alert(
        `The password has been successfully sent. The backend returned token "${token}"`,
      );
    },
    onError: err => {
      setError('password', {type: 'custom', message: err.message});
    },
  });

  return (
    <StepPageLayout title="Введите пароль">
      <form
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            run(values.password, tokenToEnterPassword);
          });

          void theReturnedFunc(event);
        }}
        noValidate
      >
        <Stack spacing={2}>
          <PasswordInput
            name={'password'}
            label={'Пароль'}
            // Technically all work fine.
            // If replace PasswordInput (which is TextFieldElement) with TextFieldElement,
            // then will be no any TS error.
            // Looks like PasswordInput should be Generic with FormValues type param.
            // But don't want to spend time for this.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            control={control}
            fullWidth
            autoFocus
            autoComplete="current-password"
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
      </form>
    </StepPageLayout>
  );
};
