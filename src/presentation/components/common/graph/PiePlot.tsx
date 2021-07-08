import { Grid, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { Pie } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const PiePlot: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <div className="header">
            <h1 className="title">Pie Chart</h1>
            <div className="links">
              <a
                className="btn btn-gh"
                href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Pie.js"
              >
                Github Source
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Pie type="Pie" data={data} width={200} height={200} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PiePlot;
