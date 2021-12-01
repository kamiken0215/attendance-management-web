import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#393E46',
    color: '#EEE',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  header: {
    '& > h6': {
      fontWeight: 'bold',
    },
  },
  icon: {
    textAlign: 'center',
    '& > span': {
      fontSize: '3.2rem',
    },
  },
  content: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.6rem',
  },
}));

type props = {
  header: string;
  text: string;
  icon: string;
  iconcolor: string;
};

const StatusCard: FC<props> = ({
  header = '',
  text = '',
  icon = '',
  iconcolor = '',
}) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <div className={classes.icon}>
            <Icon style={{ color: iconcolor }}>{icon}</Icon>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className={classes.header}>
            <Typography variant="subtitle1">{header}</Typography>
          </div>
          <div className={classes.content}>{text}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatusCard;
