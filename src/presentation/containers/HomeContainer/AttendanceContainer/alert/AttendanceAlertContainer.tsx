import React, { FC, useContext, useState } from 'react';
import { SnackbarContext } from '../../../../../contexts/SnackbarContext';
import { UserContext } from '../../../../../contexts/UserContext';
import {
  Attendance,
  blankAttendance,
} from '../../../../../services/attendance-management/models/Attendance';
import AlertDialog from '../../../../components/common/dialog/AlertDialog';
import { attendancePageUsecase } from '../../../../../usecase/attendancePageUsecase';

type props = {
  attendance: Attendance;
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttendanceAlertContainer: FC<props> = ({
  attendance = blankAttendance,
  openAlert = false,
  setOpenAlert = () => undefined,
}) => {
  const { toggleSnack } = useContext(SnackbarContext);
  const user = useContext(UserContext);
  const eliminate = async () => {
    const delData = attendance;
    let result: number;
    result = await attendancePageUsecase().eliminateAttendances(
      user.user.id,
      delData.attendance_date,
      user.user.token,
    );
    if (result >= 200 && result < 300) {
      setOpenAlert(false);
      toggleSnack(true, 'success', 'データ削除完了');
    } else {
      toggleSnack(true, 'error', '削除失敗 code:' + result);
    }
  };

  return (
    <AlertDialog
      openAlert={openAlert}
      setOpenAlert={setOpenAlert}
      title="出退勤データ削除"
      message="データを削除してもよろしいですか?"
      handleOnClick={eliminate}
    />
  );
};

export default AttendanceAlertContainer;
