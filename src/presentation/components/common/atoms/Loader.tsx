import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiCircularProgress-colorPrimary': {
        color: '#FD7013',
      },
    },
  }),
);

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
  );
}
