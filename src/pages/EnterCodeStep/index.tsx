import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Stack} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';
import {object, string} from 'yup';

import {CodeFormat} from './CodeFormat';

import {enterSmsCode} from '@/api';
import {StepPageLayout} from '@/components/StepPageLayout';
import {ROUTE__ENTER_PASSWORD_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';

const codeRegExp = /^\d{4}$/;

const v8nSchema = object().shape({
  code: string()
    .required('Введите код из СМС')
    .matches(codeRegExp, 'СМС код состоит из 4-х цифр'),
});

export const EnterCodeStep = () => {
  const navigate = useNavigate();
  const {code, setCode, tokenToEnterSmsCode, setTokenToEnterPassword} =
    useAuthData();

  const {control, handleSubmit, setError} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      code,
    },
  });

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
      </form>
    </StepPageLayout>
  );
};
