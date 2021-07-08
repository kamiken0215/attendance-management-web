import 'date-fns';
import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      color: '#EEEEEE',
    },
  },
  input: {
    color: '#EEEEEE',
  },
  outline: {
    color: '#FD7013',
  },
}));

type Props = {
  format: string;
  views: Array<'year' | 'date' | 'month'>;
  label?: string;
  value?: Date;
  setValue: (value: React.SetStateAction<Date>) => void;
  onChange: (newValue: any) => void;
  id?: string;
};

const SelectDate: FC<Props> = ({
  format = 'yyyy/MM',
  views = ['year', 'month'],
  label = '',
  value = '',
  setValue = () => undefined,
  onChange = () => undefined,
  id = '',
}) => {
  const classes = useStyle();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          className={classes.root}
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
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{
            className: classes.input,
          }}
          FormHelperTextProps={{
            className: classes.outline,
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default SelectDate;
