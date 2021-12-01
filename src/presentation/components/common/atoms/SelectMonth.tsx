import 'date-fns';
import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
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

const SelectMonth: FC<Props> = ({
  format = 'yyyy/MM',
  views = ['year', 'month'],
  label = '',
  value = '',
  setValue = () => undefined,
  id = '',
}) => {
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <TimePicker
        ampm={false}
        mask="____/__"
        inputFormat={format}
        toolbarFormat={'year'}
        label={label}
        value={value}
        onChange={(date) => {
          console.log(date);
          setValue(date);
        }}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};

export default SelectMonth;
