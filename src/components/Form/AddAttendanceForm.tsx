import { Button, makeStyles } from '@material-ui/core';
import React, { FC, FormEvent, useContext, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PopupDialog from '../common/dialog/Popup';
import AttendanceForm from './AttendanceForm';
import {
  Attendance,
  blankAttendance,
} from '../../services/attendance-management/models/Attendance';
import addAttendance from '../../services/add-attendance';
import { UserContext } from '../../contexts/UserContext';
import insertOrUpdateAttendance from '../../services/ins-upd-attendance';
import Snackbars from '../common/atoms/Snackbars';
import { AttendancesContext } from '../../contexts/AttendancesContext';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: '8rem',
  },
}));

type props = {
  onFinished: () => void;
  values: {
    q: string;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      q: string;
    }>
  >;
  severity?: 'success' | 'error' | 'warning' | 'info';
};

type SnackbarSeverity = { severity: 'success' | 'error' | 'warning' | 'info' };

const AddAttendanceForm: FC<props> = ({
  onFinished = () => undefined,
  values = { q: '' },
  setValues = () => undefined,
  severity = 'success',
}) => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [attendances, setAttendances] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [snackbarStyle, setSnackbarStyle] = useState({
    severity: severity,
    text: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  //  add attendance
  const addNew = async (attendance: Attendance, resetForm: () => void) => {
    console.log(attendance);
    const result = await insertOrUpdateAttendance(
      attendance,
      user.user.id,
      user.user.token,
    );
    if (result != null) {
      resetForm();
      setOpenPopup(false);
      setValues(values);
      setSnackbarStyle({ severity: 'success', text: '更新に成功しました！' });
      setAttendances(result);
      setOpenSnackbar(true);
    }
  };

  const showSnackbar = (
    severity: 'success' | 'error' | 'warning' | 'info',
    text: string,
  ) => {
    const value = { severity: severity, text: text };
    setSnackbarStyle(value);
    setOpenSnackbar(true);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={() => setOpenPopup(true)}
      >
        ADD
      </Button>

      <PopupDialog
        title="新規登録"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AttendanceForm attendance={blankAttendance} addOrEdit={addNew} />
      </PopupDialog>

      <Snackbars
        severity={snackbarStyle.severity}
        text={snackbarStyle.text}
        isOpen={openSnackbar}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default AddAttendanceForm;
