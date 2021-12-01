import 'date-fns';
import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { CalendarToday } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ja } from 'date-fns/locale';
import { makeStyles } from '@material-ui/styles';

type Props = {
  format?: string;
  views?: Array<'year' | 'date' | 'month'>;
  label?: string;
  value?: string;
  setValue?: (value: React.SetStateAction<Date>) => void;
  id?: string;
};

const DatePicker: FC<Props> = ({
  format = 'yyyy/MM',
  views = ['year', 'month'],
  label = '',
  value = '',
  setValue = () => undefined,
  id = '',
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      <KeyboardDatePicker
        disableToolbar
        views={views}
        variant="inline"
        format={format}
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={value}
        onChange={setValue}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        InputLabelProps={{
          style: {
            fontWeight: 500,
            color: '#fff',
            outlineColor: '#fff',
          },
        }}
        keyboardIcon={<CalendarToday style={{ color: '#fff' }} />}
        InputProps={{
          readOnly: true,
          style: {
            fontWeight: 500,
            color: '#fff',
            outlineColor: '#fff',
            borderColor: '#fff',
          },
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
