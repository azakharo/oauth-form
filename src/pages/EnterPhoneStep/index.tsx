import {Button, Container, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';

export const EnterPhoneStep = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      phone: '',
    },
  })

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit((data) => console.log(data))} noValidate style={{marginTop: 60}}>
        <Stack spacing={2}>
          <TextFieldElement
            name={'phone'}
            label={'Phone'}
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
