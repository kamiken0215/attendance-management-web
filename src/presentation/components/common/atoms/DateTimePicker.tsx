import React, { FC, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
};

export const DatePicker: FC<Props> = ({
  name = '',
  label = '',
  value = '',
  onChange = () => undefined,
}) => {
  const [selectedDate, setSelectedDate] = useState();

  const handleInputChange = (event: React.ChangeEvent) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        margin="normal"
        name={name}
        label={label}
        value={value}
        onChange={(date) => console.log(date)}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
