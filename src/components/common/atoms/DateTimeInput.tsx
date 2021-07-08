import 'date-fns';
import React, { FC } from 'react';
import { TextField } from '@material-ui/core';

type Props = {
  name: string;
  label: string;
  value: string;
  defaultValue?: string;
  color: 'primary' | 'secondary';
  onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
};

export const DateInput: FC<Props> = ({
  name = '',
  label = '',
  value = '',
  color = 'primary',
  defaultValue = '',
  onChange = () => undefined,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      type="date"
      color={color}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export const TimeInput: FC<Props> = ({
  name = '',
  label = '',
  value = '',
  defaultValue = '',
  color = 'primary',
  onChange = () => undefined,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      type="time"
      color={color}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, //  5 min
      }}
    />
  );
};
