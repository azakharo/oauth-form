import React from 'react';
import {PatternFormat, PatternFormatProps} from 'react-number-format';

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

export const PhoneFormat = React.forwardRef<PatternFormatProps, CustomProps>(
  (props, ref) => {
    const {onChange, ...restProps} = props;

    return (
      <PatternFormat
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="+7 ### ### ## ##"
        allowEmptyFormatting
        mask=" "
        {...restProps}
      />
    );
  },
);
