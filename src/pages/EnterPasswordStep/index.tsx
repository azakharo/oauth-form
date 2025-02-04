import {Button, Container, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useAuthData} from '@/contexts/AuthDataContext';

export const EnterPasswordStep = () => {
  const {phone, code, password, setPassword} = useAuthData();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      password,
    },
  })

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(values => {
        setPassword(values.password);
        alert(`You entered phone ${phone}, code ${code}, password ${values.password}`);
      })} noValidate style={{marginTop: 60}}>
        <Stack spacing={2}>
          <TextFieldElement
            name={'password'}
            label={'Пароль'}
            control={control}
            required
            fullWidth
          />

          <Button type={'submit'} color={'primary'} variant="contained">
            Далее
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
