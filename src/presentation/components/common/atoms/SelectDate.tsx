import 'date-fns';
import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import en from 'date-fns/locale/en-US';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

type Props = {
  format: string;
  views: Array<'year' | 'date' | 'month'>;
  label?: string;
  value?: string;
  setValue: (value: React.SetStateAction<Date>) => void;
  id?: string;
};

const SelectDate: FC<Props> = ({
  format = 'yyyy/MM',
  views = ['year', 'month'],
  label = '',
  value = '',
  setValue = () => undefined,
  id = '',
}) => {
  return (
    // <LocalizationProvider dateAdapter={DateFnsUtils} locale={jaLocale}>
    <DatePicker
      inputFormat={format}
      mask="__/__/____"
      label={label}
      value={value}
      views={views}
      onChange={(date) => {
        console.log(date);
        setValue(date);
      }}
      renderInput={(props) => <TextField {...props} disabled={true} />}
    />
    // </LocalizationProvider>
  );
};

export default SelectDate;
