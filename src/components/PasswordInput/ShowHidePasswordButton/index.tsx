import {memo} from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IconButton, InputAdornment} from '@mui/material';

import {COLOR__MAIN_BLACK} from '@/theme/colors';

const iconStyles = {
  fontSize: 16,
  fill: COLOR__MAIN_BLACK,
};

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
        {showPassword ? (
          <VisibilityOff sx={iconStyles} />
        ) : (
          <Visibility sx={iconStyles} />
        )}
      </IconButton>
    </InputAdornment>
  );
};

export default memo(ShowHidePasswordButton);
