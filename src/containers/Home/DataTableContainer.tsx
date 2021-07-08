import React, { FC } from 'react';
import useAttendances from '../../hooks/use-attendances';
import DataTable from '../../components/Home/DataTable';
import {
  Attendance,
  AddIdAttendance,
} from '../../services/attendance-management/models/Attendance';
import { addIdToMap } from '../../utils/add-id-tool';

const EnhancedDataTable: FC<{ userId: string; date: string }> = ({
  userId,
  date,
}) => {
  console.count('EnhancedDataTable');
  const [attendances, error] = useAttendances(userId, date);
  console.log(attendances);

  const addIdMap = addIdToMap(attendances as AddIdAttendance[]);

  //if (error != null) {
  //return <DataTable attendances={addIdMap} />;
  return <DataTable />;
  //}
  //return <div />;
};

export default EnhancedDataTable;
