import React, { FC, useContext } from 'react';
import { SnackbarContext } from '../../../../../contexts/SnackbarContext';
import { UserContext } from '../../../../../contexts/UserContext';
import {
  Attendance,
  blankAttendance,
} from '../../../../../entities/Attendance';
import AlertDialog from '../../../../components/common/dialog/AlertDialog';
import { attendancePageUsecase } from '../../../../../usecase/attendancePageUsecase';
import { Attendances, blankData } from '../../../../../entities/Attendances';

type props = {
  attendance: Attendances;
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttendanceAlertContainer: FC<props> = ({
  attendance = blankData,
  openAlert = false,
  setOpenAlert = () => undefined,
}) => {
  const { toggleSnack } = useContext(SnackbarContext);
  const users = useContext(UserContext);
  const eliminate = async () => {
    const delData = attendance;
    let result: number;
    result = await attendancePageUsecase().eliminateAttendances(
      users.users.companyId,
      users.users.departmentCode,
      users.users.userId,
      delData.attendanceDate,
      users.users.token,
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
