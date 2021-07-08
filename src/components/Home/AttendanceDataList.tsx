import React, { FC } from 'react';
import { Attendance } from '../../services/attendance-management/models/Attendance';
import Loader from '../common/atoms/Loader';
import DataTable from '../DataTables/AttendanceDataTable';

type props = {
  attendances: Attendance[];
  loading?: boolean;
};

const AttendanceDataList: FC<props> = ({
  attendances = [],
  loading = false,
}) => {
  return loading ? <Loader /> : <DataTable attendances={attendances} />;
};

export default AttendanceDataList;
