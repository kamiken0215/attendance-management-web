import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { FC } from 'react';
import StatusCardContaier from '../../common/atoms/StatusCardContainer';
import DoughnutPlot from '../../common/graph/Doughnut';
import LineChart from '../../common/graph/Line';

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
  numOfAttendances: string;
  totalWorkedTime: string;
  paidHolidays: string;
  labelList: string[];
  valueList: number[];
  doughnutData: {
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string;
    }[];
    labels: string[];
  };
  doughnutRate: string;
  doughnutLabels: string[];
};

const AttendanceDataViews: FC<props> = ({
  numOfAttendances = '',
  totalWorkedTime = '',
  paidHolidays = '',
  labelList = [],
  valueList = [],
  doughnutData,
  doughnutRate,
  doughnutLabels,
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
              iconcolor="#CB366D"
            />
          </Grid>
          <Grid item xs={4}>
            <StatusCardContaier
              header="総勤務時間"
              text={totalWorkedTime + ' h'}
              icon="av_timer"
              iconcolor="#4455D4"
            />
          </Grid>
          <Grid item xs={4}>
            <StatusCardContaier
              header="残り有給"
              text={paidHolidays + ' 日'}
              icon="hotel"
              iconcolor="#F18C1F"
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
            <DoughnutPlot
              data={doughnutData}
              rate={doughnutRate}
              labelList={doughnutLabels}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDataViews;
