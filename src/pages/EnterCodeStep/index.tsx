import {Button, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {ROUTE__ENTER_PASSWORD_STEP} from '@/constants';
import {useAuthData} from '@/contexts/AuthDataContext';
import {StepPageLayout} from '@/components/StepPageLayout';

export const EnterCodeStep = () => {
  const navigate = useNavigate();
  const {code, setCode} = useAuthData();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      code,
    },
  });

  return (
    <StepPageLayout>
      <form
        onSubmit={handleSubmit(values => {
          setCode(values.code);
          navigate(ROUTE__ENTER_PASSWORD_STEP);
        })}
        noValidate
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
    </StepPageLayout>
  );
};
