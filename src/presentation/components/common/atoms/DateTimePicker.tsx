// import React, { FC, useState } from 'react';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
import React, { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@material-ui/pickers';
// type Props = {
//   format?: string;
//   name: string;
//   label: string;
//   value: string;
//   defaultValue?: string;
//   color: 'primary' | 'secondary';
//   onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
// };

// const SelectMonth: FC<Props> = ({
//   format = 'yyyy/MM/dd HH:mm',
//   label = '',
//   value = '',
//   onChange = () => undefined,
// }) => {
//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
//       <DateTimePicker
//         value={value}
//         onChange={onChange}
//         format={format}
//         renderDay={(props) => <TextField {...props} />}
//         ampm={false}
//       />
//     </MuiPickersUtilsProvider>
//   );
// };

// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import TextField from '@material-ui/core/TextField';
// import { DateTimePicker, LocalizationProvider } from '@material-ui/lab';

// type DatePicker = {
//   name: string;
//   label: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
// };

// export const DatePicker: FC<DatePicker> = ({
//   name = '',
//   label = '',
//   value = '',
//   onChange = () => undefined,
// }) => {
//   const [selectedDate, setSelectedDate] = useState();

//   const handleInputChange = (event: React.ChangeEvent) => ({
//     target: {
//       name,
//       value,
//     },
//   });
//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <KeyboardDatePicker
//         disableToolbar
//         variant="inline"
//         format="yyyy-MM-dd"
//         margin="normal"
//         name={name}
//         label={label}
//         value={value}
//         onChange={(date) => console.log(date)}
//         KeyboardButtonProps={{
//           'aria-label': 'change date',
//         }}
//       />
//     </MuiPickersUtilsProvider>
//   );
// };

type DateTimePickerProps = {
  inputFormat?: string;
  name: string;
  label?: string;
  value?: Date;
  handleOnChange?: (newValue) => void;
  helperText?: string;
};

export const DateTimeInput: FC<DateTimePickerProps> = ({
  inputFormat = 'yyyy-MM-dd HH:mm',
  label = '',
  name = '',
  value = new Date(),
  handleOnChange = (newValue) => undefined,
  helperText = '',
}) => {
  const [selectedDate] = useState(new Date());
  return (
    // <LocalizationProvider dateAdapter={DateFnsUtils}>
    <DateTimePicker
      label={label}
      ampm={false}
      inputFormat={inputFormat}
      mask="__-__-____ __:__"
      value={selectedDate}
      onChange={handleOnChange}
      renderInput={(props) => <TextField {...props} />}
    />
    // </LocalizationProvider>
  );
};
