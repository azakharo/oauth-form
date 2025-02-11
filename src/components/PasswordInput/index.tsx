import React, {FC, useState} from 'react';
import {TextFieldElement, TextFieldElementProps} from 'react-hook-form-mui';

import ShowHidePasswordButton from './ShowHidePasswordButton';

const PasswordInput: FC<TextFieldElementProps> = props => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  return (
    <TextFieldElement
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <ShowHidePasswordButton
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
          />
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;
