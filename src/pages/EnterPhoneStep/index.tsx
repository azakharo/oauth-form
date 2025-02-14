import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {Button, IconButton, Stack} from '@mui/material';
import useMount from 'ahooks/es/useMount';
import useRequest from 'ahooks/es/useRequest';
import {object, string} from 'yup';

import {PhoneFormat} from './PhoneFormat';

import {enterPhone} from '@/api';
import {StepPageLayout} from '@/components/StepPageLayout';
import {ROUTE__ENTER_CODE_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';
import {COLOR__MAIN_BLACK} from '@/theme/colors';

const phoneRegExp = /^\d{10}$/;

const v8nSchema = object().shape({
  phone: string()
    .required('Введите номер телефона')
    .matches(phoneRegExp, 'Недопустимый номер телефона'),
});

export const EnterPhoneStep = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    phone,
    setPhone,
    setTokenToEnterSmsCode,
    setAppId,
    setRedirectUrl,
    setRedirectStateParam,
  } = useAuthData();

  const {control, handleSubmit, setValue, setError} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      phone,
    },
  });

  const {loading, run, params} = useRequest(enterPhone, {
    manual: true,
    onSuccess: token => {
      setPhone(params[0] as string);
      setTokenToEnterSmsCode(token);
      navigate(ROUTE__ENTER_CODE_STEP);
    },
    onError: err => {
      setError('phone', {type: 'custom', message: err.message});
    },
  });

  useMount(() => {
    setAppId(searchParams.get('client_id') ?? '');
    setRedirectUrl(searchParams.get('redirect_uri') ?? '');
    setRedirectStateParam(searchParams.get('state') ?? '');
  });

  return (
    <StepPageLayout title="Вход">
      <form
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            run(values.phone);
          });

          void theReturnedFunc(event);
        }}
        noValidate
      >
        <Stack spacing={4}>
          <TextFieldElement
            name={'phone'}
            label={'Номер телефона'}
            control={control}
            fullWidth
            InputProps={{
              type: 'tel',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              inputComponent: PhoneFormat,
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => {
                    setValue('phone', '');
                  }}
                >
                  <ClearOutlinedIcon
                    sx={{
                      fontSize: 16,
                      fill: COLOR__MAIN_BLACK,
                    }}
                  />
                </IconButton>
              ),
            }}
            autoFocus
          />

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
