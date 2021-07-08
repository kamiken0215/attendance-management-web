import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { FC, useContext, useEffect } from 'react';
import StatusCardContaier from '../atoms/StatusCardContainer';
import DoughnutPlot from '../graph/Doughnut';
import LineChart from '../graph/Line';
import { calcWorkingTime } from '../../../../utils/calc-working-time';
import { UserContext } from '../../../../contexts/UserContext';
import { createOvertimeList } from '../../../../utils/create-overtime-list';
import { AttendancesContext } from '../../../../contexts/AttendancesContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  data: {
    marginBottom: theme.spacing(2),
  },
  graphPaper: {
    padding: theme.spacing(2),
    margin: 0,
    textAlign: 'center',
    backgroundColor: '#393E46',
    color: '#EEE',
    height: '16rem',
  },
  graphPaperColor: {
    padding: theme.spacing(2),
    margin: 0,
    textAlign: 'center',
    backgroundColor: '#FD7013',
    height: '16rem',
  },
  content: {
    color: theme.palette.text.secondary,
  },
}));

// type props = {
//   attendances: Attendance[];
// };

const AttendanceDataHeader: FC = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const { attendances, selectedDate } = useContext(AttendancesContext);
  let days;
  let workTimes;
  let labelList: string[] = [];
  let valueList: number[] = [];

  if (attendances != null) {
    days = String(attendances.length);
    workTimes = String(calcWorkingTime(attendances));
    const { labels, values } = createOvertimeList(
      attendances,
      Number(selectedDate.substring(0, 4)),
      Number(selectedDate.substring(4, 6)),
    );
    labelList = labels;
    valueList = values;
    console.log(valueList);
  }

  return (
    <div className={classes.root}>
      <div className={classes.data}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <StatusCardContaier
              header="出勤日数"
              text={days + ' 日'}
              icon="directions_run"
            />
          </Grid>
          <Grid item xs={4}>
            <StatusCardContaier
              header="総勤務時間"
              text={workTimes + ' h'}
              icon="av_timer"
            />
          </Grid>
          <Grid item xs={4}>
            <StatusCardContaier
              header="残り有給"
              text={
                user.rest_paid_holidays + ' / ' + user.paid_holidays + ' 日'
              }
              icon="hotel"
            />
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <div className={classes.content}>
            <LineChart labels={labelList} dataList={valueList} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.graphPaperColor}>
            <DoughnutPlot />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDataHeader;
