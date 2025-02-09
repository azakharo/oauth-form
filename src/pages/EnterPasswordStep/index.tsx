import {Button, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useAuthData} from '@/contexts/AuthDataContext';
import {StepPageLayout} from '@/components/StepPageLayout';
import useRequest from 'ahooks/es/useRequest';
import {enterPassword} from '@/api';
import {ErrorMessage} from '@/components/ErrorMessage';

export const EnterPasswordStep = () => {
  const {password, setPassword, tokenToEnterPassword, setTokenToGetGrants} =
    useAuthData();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      password,
    },
  });

  const {loading, error, run, params} = useRequest(enterPassword, {
    manual: true,
    onSuccess: token => {
      setPassword(params[0] as string);
      setTokenToGetGrants(token);
      alert(
        `The password has been successfully sent. The backend returned token "${token}"`,
      );
    },
  });

  return (
    <StepPageLayout title="Введите пароль">
      <form
        onSubmit={handleSubmit(values => {
          run(values.password, tokenToEnterPassword);
        })}
        noValidate
      >
        <Stack spacing={2}>
          <TextFieldElement
            name={'password'}
            label={'Пароль'}
            control={control}
            fullWidth
          />
          {error && <ErrorMessage error={error} />}

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
