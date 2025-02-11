import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Stack} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';
import {object, string} from 'yup';

import {PhoneFormat} from './PhoneFormat';

import {enterPhone} from '@/api';
import {ErrorMessage} from '@/components/ErrorMessage';
import {StepPageLayout} from '@/components/StepPageLayout';
import {ROUTE__ENTER_CODE_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';
import {COLOR__ERROR} from '@/theme/colors';

const phoneRegExp = /^\d{10}$/;

const v8nSchema = object().shape({
  phone: string()
    .required('Введите номер телефона')
    .matches(phoneRegExp, 'Недопустимый номер телефона'),
});

export const EnterPhoneStep = () => {
  const navigate = useNavigate();
  const {phone, setPhone, setTokenToEnterSmsCode} = useAuthData();

  const {control, handleSubmit} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      phone,
    },
  });

  const {loading, error, run, params} = useRequest(enterPhone, {
    manual: true,
    onSuccess: token => {
      setPhone(params[0] as string);
      setTokenToEnterSmsCode(token);
      navigate(ROUTE__ENTER_CODE_STEP);
    },
  });

  return (
    <StepPageLayout title="Вход">
      <form
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            // +7 пользователь не вводит, но на бэкенд 7-ку передавать надо
            run(`7${values.phone}`);
          });

          void theReturnedFunc(event);
        }}
        noValidate
      >
        <Stack spacing={3}>
          <TextFieldElement
            name={'phone'}
            label={'Номер телефона'}
            control={control}
            fullWidth
            sx={{
              fieldset: {
                borderColor: error ? COLOR__ERROR : undefined,
              },
            }}
            InputProps={{
              type: 'tel',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              inputComponent: PhoneFormat,
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
            Получить код
          </Button>
        </Stack>
      </form>
    </StepPageLayout>
  );
};
