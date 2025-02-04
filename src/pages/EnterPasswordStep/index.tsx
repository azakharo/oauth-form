import {Button, Container, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';

export const EnterPasswordStep = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      password: '',
    },
  })

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
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
