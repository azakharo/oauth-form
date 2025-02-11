import {memo} from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IconButton, InputAdornment} from '@mui/material';

interface Props {
  showPassword: boolean;
  handleClickShowPassword: () => void;
}

const ShowHidePasswordButton = ({
  showPassword,
  handleClickShowPassword,
}: Props) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default memo(ShowHidePasswordButton);
