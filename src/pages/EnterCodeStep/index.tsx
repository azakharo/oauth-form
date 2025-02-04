import {Button, Container, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {ROUTE__ENTER_PASSWORD_STEP} from '../../constants';

export const EnterCodeStep = () => {
  const navigate = useNavigate();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      code: '',
    },
  });

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={handleSubmit(data => {
          console.log(data);
          navigate(ROUTE__ENTER_PASSWORD_STEP);
        })}
        noValidate
        style={{marginTop: 60}}
      >
        <Stack spacing={2}>
          <TextFieldElement
            name={'code'}
            label={'Введите код'}
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
