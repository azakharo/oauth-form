import {Button, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {ROUTE__ENTER_CODE_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';
import {StepPageLayout} from '@/components/StepPageLayout';
import useRequest from 'ahooks/es/useRequest';
import {enterPhone} from '@/api';

export const EnterPhoneStep = () => {
  const navigate = useNavigate();
  const {phone, setPhone, setTokenToEnterSmsCode} = useAuthData();
  const {control, handleSubmit} = useForm({
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
  });

  return (
    <StepPageLayout title="Вход">
      <form
        onSubmit={handleSubmit(values => {
          run(values.phone);
        })}
        noValidate
      >
        <Stack spacing={3}>
          <TextFieldElement
            name={'phone'}
            label={'Номер телефона'}
            control={control}
            required
            fullWidth
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
