import {Button, Container, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import { useNavigate } from 'react-router-dom';
import {ROUTE__ENTER_CODE_STEP} from '@/constants';

export const EnterPhoneStep = () => {
  const navigate = useNavigate();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      phone: '',
    },
  })

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
        navigate(ROUTE__ENTER_CODE_STEP)
      })} noValidate style={{marginTop: 60}}>
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
    </Container>
  );
};
