import React, { FC, useContext, useEffect, useState } from 'react';
import {
  Attendance,
  blankAttendance,
} from '../../../../../entities/Attendance';
import PopupDialog from '../../../../components/common/dialog/Popup';

import AttendanceForm from '../../../../components/Home/Attendance/AttendanceForm';
import { UserContext } from '../../../../../contexts/UserContext';
import {
  attendancePageUsecase,
  formatToDate,
  formatToOnlyTime,
} from '../../../../../usecase/attendancePageUsecase';
import { SnackbarContext } from '../../../../../contexts/SnackbarContext';
import { useForm } from '../../../../components/common/form/Form';
import { Attendances, blankData } from '../../../../../entities/Attendances';

type props = {
  attendance: any;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttendancePopupContainer: FC<props> = ({
  attendance = blankData,
  openPopup = false,
  setOpenPopup = () => undefined,
}) => {
  const users = useContext(UserContext);
  const { toggleSnack } = useContext(SnackbarContext);

  const addOrEdit = async (attendance: Attendances, resetForm: () => void) => {
    let result: Attendances | null;
    result = await attendancePageUsecase().writeAttendance(
      users.users.token,
      attendance,
    );
    if (result != null) {
      resetForm();
      setOpenPopup(false);
      toggleSnack(true, 'success', 'データ登録完了');
    } else {
      toggleSnack(true, 'error', '登録失敗');
    }
  };

  //  validation

  const { values, setValues, handleInputChange, resetForm } = useForm(
    attendance,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ret = attendancePageUsecase().validate(values);
    console.log(ret);
    if (ret.length > 0) {
      toggleSnack(true, 'warning', ret);
    } else {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    const theData = blankData;
    if (attendance != null) {
      theData.attendanceDate = attendance.attendanceDate;
      theData.startTime = attendance.startTime;
      theData.endTime = attendance.endTime;
      setValues({
        ...theData,
      });
    }
  }, [attendance]);

  return (
    <div>
      <PopupDialog
        title="新規登録"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AttendanceForm
          values={values}
          addOrEdit={addOrEdit}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          resetForm={resetForm}
        />
      </PopupDialog>
    </div>
  );
};

export default AttendancePopupContainer;
