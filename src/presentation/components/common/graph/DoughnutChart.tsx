import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: '#FD7013',
    justifyContent: 'center',
    color: '#EEE',
  },
  chartContainer: {
    marginTop: theme.spacing(3),
  },
  stats: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'left',
  },
  status: {
    textAlign: 'left',
    padding: theme.spacing(1),
  },
  title: {
    color: '#EEE',
    paddingBottom: theme.spacing(1),
    fontSize: '1rem',
  },
  statusIcon: {
    color: '#EEE',
  },
}));

const graphdata = {
  datasets: [
    {
      data: [75, 20, 5],
      backgroundColor: ['#5CF2E8', '#F0CEA0', 'red'],
      borderColor: 'transparent',
    },
  ],
  labels: ['完了', '進行中', '未完了'],
};
const doughnutOptions = {
  responsive: false,
  maintainAspectRatio: false,
};

type props = {
  title: string;
  data: {
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string;
    }[];
    labels: string[];
  };
};

const DoughnutChart: FC = () => {
  const classes = useStyle();
  return (
    <Card className={classes.root}>
      <CardHeader title="申請状況" />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid item xs={8} sm={6}>
            <div className={classes.chartContainer}>
              <Doughnut
                type={Doughnut}
                data={graphdata}
                options={doughnutOptions}
              />
            </div>
          </Grid>
          <Grid item xs={4} sm={6}>
            <div className={classes.stats}>
              <div className={classes.status}>
                <Typography variant="body1" className={classes.title}>
                  完了
                </Typography>
                <Typography variant="h5">75%</Typography>
                <Typography variant="body1" className={classes.title}>
                  進行中
                </Typography>
                <Typography variant="h5">20%</Typography>
                <Typography variant="body1" className={classes.title}>
                  未完了
                </Typography>
                <Typography variant="h5">5%</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
