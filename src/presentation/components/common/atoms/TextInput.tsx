import { TextField } from '@material-ui/core';
import React, { FC } from 'react';

type Props = {
  name: string;
  label: string;
  value: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
};

const FormTextInput: FC<Props> = ({
  name = '',
  label = '',
  value = '',
  defaultValue = '',
  onChange = () => undefined,
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default FormTextInput;
