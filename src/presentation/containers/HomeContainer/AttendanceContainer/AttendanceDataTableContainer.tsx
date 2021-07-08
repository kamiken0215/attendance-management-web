import React, { FC, useState } from 'react';
import { Attendance } from '../../../../services/attendance-management/models/Attendance';
import AttendancePopupContainer from './popup/AttendancePopupContainer';
import AttendanceAlertContainer from './alert/AttendanceAlertContainer';
import AttendanceDataTable from '../../../components/Home/Attendance/AttendanceDataTable';

type props = {
  attendances: Attendance[];
};

const AttendanceDataTableContainer: FC<props> = ({ attendances = [] }) => {
  console.count(AttendanceDataTableContainer.name);
  const [selectedRecord, setSelectedRecord] = useState<Attendance | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const openInPopup = (rowData: any) => {
    setSelectedRecord(rowData);
    setOpenPopup(true);
  };

  const openInAlert = (rowData: any) => {
    setSelectedRecord(rowData);
    setOpenAlert(true);
  };

  return (
    <div>
      <AttendanceDataTable
        attendances={attendances}
        openInPopup={openInPopup}
        openInAlert={openInAlert}
      />
      <AttendancePopupContainer
        attendance={selectedRecord}
        openPopup={openPopup}
        setOpenPopup={openInPopup}
      />
      <AttendanceAlertContainer
        attendance={selectedRecord}
        openAlert={openAlert}
        setOpenAlert={openInAlert}
      />
    </div>
  );
};

export default AttendanceDataTableContainer;
