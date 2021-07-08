import 'date-fns';
import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date('2014-08-18T21:11:54'),
  // );

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format={format}
          views={views}
          margin="normal"
          label={label}
          id={id}
          value={value}
          onChange={(date) => {
            console.log(date);
            setValue(date);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default SelectMonth;
