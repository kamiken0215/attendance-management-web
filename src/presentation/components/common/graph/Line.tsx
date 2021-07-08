import {
  Card,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '16rem',
    width: '100%',
    backgroundColor: '#393E46',
  },
  title: {
    color: '#EEE',
    margin: theme.spacing(1),
    '& .MuiTypography-root': {
      fontWeight: 'bold',
    },
  },
  chartContainer: {
    position: 'relative',
    width: '100%',
    '& .lineCart': {
      fontColor: '#EEE',
    },
  },
  lineCart: {
    fontColor: '#EEE',
  },
}));

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
    color: '#EEE',
  },
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: '#EEE',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: '#EEE',
        },
      },
    ],
  },
};

type props = {
  labels: string[];
  dataList: number[];
};

const LineChart: FC<props> = ({ labels = [], dataList = [] }) => {
  const classes = useStyle();

  let dataSet = {
    labels: labels,
    datasets: [
      {
        label: '残業時間',
        data: dataList,
        fill: false,
        backgroundColor: '#FD7013',
        borderColor: '#FD7013',
        color: '#EEE',
      },
    ],
  };

  return (
    <Card className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">残業推移</Typography>
      </div>
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Line
            type="line"
            data={dataSet}
            options={options}
            className="lineCart"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
