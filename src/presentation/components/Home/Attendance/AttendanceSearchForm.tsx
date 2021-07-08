import React, { FC, useContext, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { FormControls } from '../../common/atoms/FormControls';
import SearchIcon from '@material-ui/icons/Search';
import { format } from 'date-fns';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing(2),
    width: '14rem',
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

  const formatMonth = (): string => {
    console.log('date is ===' + String(selectedMonth));
    if (selectedMonth != null) {
      return String(('0' + (selectedMonth.getMonth() + 1)).slice(-2));
    } else {
      return '';
    }
  };

  return (
    <div className={classes.root}>
      <FormControls.SelectDate
        format={'yyyy'}
        views={['year']}
        label={'年を選ぶ'}
        value={selectedYear}
        setValue={setSelectedYear}
        onChange={(newValue) => {
          setSelectedYear(newValue);
        }}
        id={'randommm'}
      />
      <FormControls.SelectDate
        format={'MM'}
        views={['month']}
        label={'月を選ぶ'}
        value={selectedMonth}
        onChange={(newValue) => {
          setSelectedMonth(newValue);
        }}
        setValue={setSelectedMonth}
        id={'randomm'}
      />

      <Button
        className={classes.button}
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() =>
          handleOnClick('q', String(selectedYear.getFullYear()) + formatMonth())
        }
      >
        検索
      </Button>
    </div>
  );
};

export default AttendanceSearchForm;
