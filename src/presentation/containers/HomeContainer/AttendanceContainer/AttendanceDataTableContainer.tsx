import React, { FC, useContext, useState } from 'react';
import { Attendances } from '../../../../entities/Attendances';
import { getAttendanceClasseCodeByName } from '../../../../entities/AttendanceClasses';
import { getAttendanceStatusCodeByName } from '../../../../entities/AttendanceStatus';
import AttendanceDataTable from '../../../components/Home/Attendance/AttendanceDataTable';

import Loader from '../../../components/common/atoms/Loader';
import { AttendanceClassesContext } from '../../../../contexts/AttendanceClassesContext';
import { AttendanceStatusContext } from '../../../../contexts/AttendanceStatusContext';
import { MainPageContext } from '../../../../contexts/MainPageContext';
import { UserContext } from '../../../../contexts/UserContext';
import { attendancePageUsecase } from '../../../../usecase/attendancePageUsecase';
import { SnackbarContext } from '../../../../contexts/SnackbarContext';
import { PostOrDeleteResponse } from '../../../../entities/PostOrDeleteResponse';

type props = {
  attendances: Attendances[];
};

const AttendanceDataTableContainer: FC<props> = ({ attendances = [] }) => {
  console.count(AttendanceDataTableContainer.name);

  const { toggleSnack } = useContext(SnackbarContext);
  const { user: users } = useContext(UserContext);
  const { attendanceClasses, attendanceStatus } = useContext(MainPageContext);

  const rowAddHandler = (newData: Attendances) => {
    alert(newData);
    console.log(newData.startTime);
  };

  const rowUpdateHandler = (newData: any, oldData: any) => {
    const attendanceClassCode = getAttendanceClasseCodeByName(
      attendanceClasses,
      newData.attendanceClassName,
    );

    newData.attendanceClassCode = attendanceClassCode;

    const attendanceStatusCode = getAttendanceStatusCodeByName(
      attendanceStatus,
      newData.attendanceStatusName,
    );

    newData.attendanceStatusCode = attendanceStatusCode;

    newData.userId = users.userId;

    //  validate
    //  update
    const data: Attendances = newData as Attendances;
    let attendances: Attendances[] = new Array();
    attendances.push(data);
    console.log(attendances);

    const update = async () => {
      const result = (await attendancePageUsecase().writeAttendance(
        users.token,
        users.companyId,
        attendances,
      )) as PostOrDeleteResponse;

      console.log(result);

      if (result.ok) {
        alert('更新完了');
      } else {
        alert('失敗');
      }
    };
    update();
  };

  const rowDeleteHandler = (oldData: any) => {
    const eliminate = async () => {
      const result = (await attendancePageUsecase().eliminateAttendances(
        users.companyId,
        users.departmentCode,
        users.userId,
        oldData.attendanceDate,
        users.token,
      )) as PostOrDeleteResponse;
      if (result.ok) {
        alert('削除完了');
      } else {
        alert('失敗');
      }
    };
    eliminate();
  };

  if (!attendanceClasses || !attendanceStatus) {
    return <Loader />;
  } else {
    return (
      <div>
        <AttendanceDataTable
          attendances={attendances}
          attendanceClasses={attendanceClasses}
          attendanceStatus={attendanceStatus}
          rowAddHandler={rowAddHandler}
          rowUpdateHandler={rowUpdateHandler}
          rowDeleteHandler={rowDeleteHandler}
        />
      </div>
    );
  }
};

export default AttendanceDataTableContainer;
