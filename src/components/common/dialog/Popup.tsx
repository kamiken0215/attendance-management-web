import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { FormControls } from '../atoms/FormControls';
import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(2),
  },
  dialogHeader: {
    display: 'flex',
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  TypographyPos: {
    flexGrow: 1,
  },
}));

type PopupDialogProps = {
  title?: string;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupDialog: FC<PopupDialogProps> = ({
  children,
  title = '',
  openPopup = false,
  setOpenPopup = () => undefined,
}) => {
  const classes = useStyle();
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div className={classes.dialogHeader}>
          <Typography
            variant="h6"
            component="div"
            className={classes.TypographyPos}
          >
            {title}
          </Typography>
          <FormControls.ActionButton
            type="reset"
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </FormControls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupDialog;
