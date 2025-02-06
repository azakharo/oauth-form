import {FC} from 'react';
import {FormHelperText} from '@mui/material';

interface Props {
  error: Error;
}

export const ErrorMessage: FC<Props> = ({error}) => (
  <FormHelperText sx={{marginTop: '4px !important'}} error={true}>
    {error.message}
  </FormHelperText>
);
