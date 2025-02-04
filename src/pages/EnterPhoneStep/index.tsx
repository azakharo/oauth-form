import {Button, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {ROUTE__ENTER_CODE_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';
import {StepPageLayout} from '@/components/StepPageLayout';

export const EnterPhoneStep = () => {
  const navigate = useNavigate();
  const {phone, setPhone} = useAuthData();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      phone,
    },
  });

  return (
    <StepPageLayout>
      <form
        onSubmit={handleSubmit(values => {
          setPhone(values.phone);
          navigate(ROUTE__ENTER_CODE_STEP);
        })}
        noValidate
      >
        <Stack spacing={2}>
          <TextFieldElement
            name={'phone'}
            label={'Номер телефона'}
            control={control}
            required
            fullWidth
          />

          <Button type={'submit'} color={'primary'} variant="contained">
            Получить код
          </Button>
        </Stack>
      </form>
    </StepPageLayout>
  );
};
