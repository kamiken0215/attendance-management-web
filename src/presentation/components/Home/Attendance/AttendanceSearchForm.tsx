import React, { FC, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { FormControls } from '../../common/atoms/FormControls';
import SearchIcon from '@material-ui/icons/Search';
import { format } from 'date-fns';
import DatePicker from '../../common/atoms/DatePicker';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#393E46',
  },
  button: {
    margin: theme.spacing(2),
    width: '14rem',
    fontWeight: 600,
    fontSize: '1.2rem',
    borderColor: '#c5c5c5',
    border: 'solid',
    background: '#FD7013',
    color: '#EEEEEE',
    '& :hover': {
      color: '#343951',
    },
  },
}));

type props = {
  selectedDate: string;
  handleOnClick?: (targetName: string, newValue: string) => void;
};

const AttendanceSearchForm: FC<props> = ({
  selectedDate = '',
  handleOnClick = (date: string) => undefined,
}) => {
  const classes = useStyle();

  const date = new Date(
    Number(selectedDate.substring(0, 4)),
    Number(selectedDate.substring(4, 6)) - 1,
  );

  const [selectedYear, setSelectedYear] = useState(date);

  const [selectedMonth, setSelectedMonth] = useState(date);

  const [selectedYearMonth, setselectedYearMonth] = useState(date);

  const formatMonth = (): string => {
    console.log('date is ===' + String(selectedMonth));
    if (selectedMonth != null) {
      return String(('0' + (selectedMonth.getMonth() + 1)).slice(-2));
    } else {
      return '';
    }
  };
  const handleOnSelectedMonth = (newValue) => {
    setSelectedMonth(newValue);
  };

  return (
    <div className={classes.root}>
      <DatePicker
        format={'yyyy年MM月'}
        views={['year', 'month']}
        label={'年月選択'}
        value={String(selectedYearMonth)}
        setValue={setselectedYearMonth}
      />

      <Button
        className={classes.button}
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() =>
          handleOnClick('q', String(format(selectedYearMonth, 'yyyyMM')))
        }
      >
        検索
      </Button>
    </div>
  );
};

export default AttendanceSearchForm;
