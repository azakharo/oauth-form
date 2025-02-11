import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {Button, Stack} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';

import {enterPassword} from '@/api';
import {ErrorMessage} from '@/components/ErrorMessage';
import {StepPageLayout} from '@/components/StepPageLayout';
import {useAuthData} from '@/contexts/AuthDataContext';
import {COLOR__ERROR} from '@/theme/colors';

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
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            run(values.password, tokenToEnterPassword);
          });

          void theReturnedFunc(event);
        }}
        noValidate
      >
        <Stack spacing={2}>
          <TextFieldElement
            name={'password'}
            label={'Пароль'}
            control={control}
            fullWidth
            sx={{
              fieldset: {
                borderColor: error ? COLOR__ERROR : undefined,
              },
            }}
            autoFocus
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
