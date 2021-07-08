import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';
import React, { FC } from 'react';

type SelectProps = {
  name: string;
  label: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => void;
  options: { id: string; title: string }[];
};

const Select: FC<SelectProps> = ({
  name = '',
  label = '',
  value = '',
  onChange = () => undefined,
  options = [{}],
}) => {
  return (
    <FormControl variant={'outlined'}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
