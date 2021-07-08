import React, { FC, useContext, useState } from 'react';
import DataTable from '../../../components/common/datatable/DataTable';
import { determineWeekday } from '../../../../utils/determine-weekday';
import { Attendance, blankAttendance } from '../../../../entities/Attendance';

type props = {
  attendances: Attendance[];
  openInPopup: (rowdata: any) => void;
  openInAlert: (rowData: any) => void;
};
const AttendanceDataTable: FC<props> = ({
  attendances = [],
  openInPopup = () => undefined,
  openInAlert = () => undefined,
}) => {
  return (
    <DataTable
      options={{
        draggable: true,
        filtering: true,
        exportButton: true,
        paging: false,
        headerStyle: { whiteSpace: 'nowrap', position: 'sticky', top: 0 },
        rowStyle: (rowData) => ({
          backgroundColor:
            determineWeekday(rowData.attendance_date) == 'holiday' ||
            determineWeekday(rowData.attendance_date) == '日'
              ? '#fff1f8'
              : determineWeekday(rowData.attendance_date) == '土'
              ? '#E8F5FF'
              : '#ffffff',
        }),
      }}
      title="出退勤データ"
      columns={[
        { title: '出勤日', field: 'attendance_date' },
        { title: '出勤時間', field: 'start_time' },
        { title: '退勤時間', field: 'end_time' },
        { title: 'メモ', field: 'notes' },
      ]}
      data={attendances as any}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Row',
          onClick: (event, rowData) => {
            openInPopup(rowData);
          },
        },
        {
          icon: 'delete',
          tooltip: 'delete Row',
          onClick: (event, rowData) => {
            openInAlert(rowData);
          },
        },
        {
          icon: 'add',
          tooltip: 'Add Row',
          isFreeAction: true,
          onClick: (event, rowData) => {
            openInPopup(blankAttendance);
          },
        },
      ]}
    />
  );
};

export default AttendanceDataTable;
