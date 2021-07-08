import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { FC } from 'react';
import StatusCardContaier from '../../common/atoms/StatusCardContainer';
import DoughnutPlot from '../../common/graph/Doughnut';
import LineChart from '../../common/graph/Line';
import { User, blankUser } from '../../../../entities/User';

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

type props = {
  user: User;
  numOfAttendances: string;
  totalWorkedTime: string;
  labelList: string[];
  valueList: number[];
};

const AttendanceDataViews: FC<props> = ({
  user = blankUser,
  numOfAttendances = '',
  totalWorkedTime = '',
  labelList = [],
  valueList = [],
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.data}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <StatusCardContaier
              header="出勤日数"
              text={numOfAttendances + ' 日'}
              icon="directions_run"
            />
          </Grid>
          <Grid item xs={4}>
            <StatusCardContaier
              header="総勤務時間"
              text={totalWorkedTime + ' h'}
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

export default AttendanceDataViews;
