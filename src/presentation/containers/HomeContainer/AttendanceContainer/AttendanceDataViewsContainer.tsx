import React, { FC, useContext } from 'react';
import { Attendance } from '../../../../services/attendance-management/models/Attendance';
import AttendanceDataViews from '../../../components/Home/Attendance/AttendanceDataViews';

import { calcWorkingTime } from '../../../../utils/calc-working-time';
import { createOvertimeList } from '../../../../utils/create-overtime-list';
import { UserContext } from '../../../../contexts/UserContext';

type props = {
  selectedDate: string;
  attendances: Attendance[];
};

const AttendanceDataViewsContentsContainer: FC<props> = ({
  selectedDate = '',
  attendances = [],
}) => {
  const user = useContext(UserContext);

  let numOfAttendances;
  let totalWorkedTime;
  let labelList: string[] = [];
  let valueList: number[] = [];

  if (attendances != null) {
    numOfAttendances = String(attendances.length);
    totalWorkedTime = String(calcWorkingTime(attendances));
    const { labels, values } = createOvertimeList(
      attendances,
      Number(selectedDate.substring(0, 4)),
      Number(selectedDate.substring(4, 6)),
    );
    labelList = labels;
    valueList = values;
    console.log(valueList);
  }

  return (
    <AttendanceDataViews
      user={user.user}
      numOfAttendances={numOfAttendances}
      totalWorkedTime={totalWorkedTime}
      labelList={labelList}
      valueList={valueList}
    />
  );
};

export default AttendanceDataViewsContentsContainer;
