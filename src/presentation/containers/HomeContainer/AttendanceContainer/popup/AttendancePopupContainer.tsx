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

type props = {
  attendance: Attendance;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttendancePopupContainer: FC<props> = ({
  attendance = blankAttendance,
  openPopup = false,
  setOpenPopup = () => undefined,
}) => {
  const user = useContext(UserContext);
  //const [recordForEdit, setRecordForEdit] = useState();

  const { toggleSnack } = useContext(SnackbarContext);

  const addOrEdit = async (attendance: Attendance, resetForm: () => void) => {
    let result: Attendance | null;
    result = await attendancePageUsecase().writeAttendance(
      user.user.id,
      user.user.token,
      attendance,
    );
    if (result != null) {
      resetForm();
      setOpenPopup(false);
      //reset(selectedDate);
      toggleSnack(true, 'success', 'データ登録完了');
    } else {
      toggleSnack(true, 'error', '登録失敗');
    }
  };

  const { values, setValues, handleInputChange, resetForm } = useForm(
    attendance,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addOrEdit(values, resetForm);
  };

  useEffect(() => {
    //  need to format of datetime
    const theData = blankAttendance;
    if (attendance != null) {
      theData.attendance_date = formatToDate(attendance.attendance_date);
      theData.start_time = formatToOnlyTime(attendance.start_time);
      theData.end_time = formatToOnlyTime(attendance.end_time);
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
