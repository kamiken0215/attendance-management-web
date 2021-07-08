import React, { FC } from 'react';
import AttendanceDataHeader from '../../components/common/header/AttendanceDataHeader';
import { Attendance } from '../../services/attendance-management/models/Attendance';
import Loader from '../../components/common/atoms/Loader';

type props = {
  attendances: Attendance[];
  loading?: boolean;
};

const EnhancedAttendanceDataHeader: FC<props> = ({
  attendances = [],
  loading = false,
}) => {
  console.log(attendances);
  return loading ? <Loader /> : <AttendanceDataHeader />;
};

export default EnhancedAttendanceDataHeader;
