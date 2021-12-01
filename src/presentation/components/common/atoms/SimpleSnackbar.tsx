import React, { FC, useContext, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SnackbarContext } from '../../../../contexts/SnackbarContext';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    zIndex: 9999,
    width: '100%',

    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const SimpleSnackbar: FC = () => {
  const classes = useStyles();
  const { snackState, toggleSnack } = useContext(SnackbarContext);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    toggleSnack(false, snackState.severity, '');
  };
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackState.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;
