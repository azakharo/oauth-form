import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {Button, Stack} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';

import {CodeFormat} from './CodeFormat';

import {enterSmsCode} from '@/api';
import {ErrorMessage} from '@/components/ErrorMessage';
import {StepPageLayout} from '@/components/StepPageLayout';
import {ROUTE__ENTER_PASSWORD_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';
import {COLOR__ERROR} from '@/theme/colors';

export const EnterCodeStep = () => {
  const navigate = useNavigate();
  const {code, setCode, tokenToEnterSmsCode, setTokenToEnterPassword} =
    useAuthData();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      code,
    },
  });

  const {loading, error, run, params} = useRequest(enterSmsCode, {
    manual: true,
    onSuccess: token => {
      setCode(params[0] as string);
      setTokenToEnterPassword(token);
      navigate(ROUTE__ENTER_PASSWORD_STEP);
    },
  });

  return (
    <StepPageLayout title="Введите код">
      <form
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            run(values.code, tokenToEnterSmsCode);
          });

          void theReturnedFunc(event);
        }}
        noValidate
      >
        <Stack spacing={2}>
          <TextFieldElement
            name={'code'}
            label={'Введите код'}
            control={control}
            fullWidth
            sx={{
              fieldset: {
                borderColor: error ? COLOR__ERROR : undefined,
              },
            }}
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
