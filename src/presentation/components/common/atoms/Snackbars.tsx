import React, { FC, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

type SnackbarsProps = {
  severity?: 'success' | 'error' | 'warning' | 'info';
  text?: string;
  isOpen: boolean;
  handleClose?: (event?: React.SyntheticEvent, reason?: string) => void;
  autoHideDuration: number;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '50%',

    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const Snackbars: FC<SnackbarsProps> = ({
  severity = 'success',
  text = '',
  isOpen = false,
  handleClose = () => undefined,
  autoHideDuration = 3000,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        security={severity}
      >
        <Alert onClose={handleClose}>{text}</Alert>
      </Snackbar>
    </div>
  );
};

export default Snackbars;
