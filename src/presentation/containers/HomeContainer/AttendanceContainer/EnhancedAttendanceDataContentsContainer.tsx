import React, { FC } from 'react';
import Loader from '../../../components/common/atoms/Loader';
import { Attendance } from '../../../../services/attendance-management/models/Attendance';
import AttendanceDataContentsContainer from './AttendanceDataContentsContainer';

type props = {
  loading?: boolean;
  data: Attendance[];
};

const EnhancedAttendanceDataContentsContainer: FC<props> = ({
  loading = false,
  data = [],
}) => {
  return loading ? <Loader /> : <AttendanceDataContentsContainer data={data} />;
};

export default EnhancedAttendanceDataContentsContainer;
