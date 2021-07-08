import React, { FC, useContext, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import {
  Attendance,
  blankAttendance,
} from '../../services/attendance-management/models/Attendance';
import PopupDialog from '../common/dialog/Popup';
import AttendanceForm from '../Form/AttendanceForm';
import { UserContext } from '../../contexts/UserContext';
import insertOrUpdateAttendance from '../../services/ins-upd-attendance';
import eliminateAttendance from '../../services/eliminate-attendance';
import { determineWeekday } from '../../utils/determine-weekday';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import SimpleSnackbar from '../common/atoms/SimpleSnackbar';
import AlertDialog from '../common/dialog/AlertDialog';
import { format } from 'date-fns';
import { AttendancesContext } from '../../contexts/AttendancesContext';

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    backgroundColor: '#393e46',

    '& thead th': {
      fontWeight: '600',
      color: '#566d7e',
      backgroundColor: '#f2f6fa',
    },

    '& tbody td': {
      fontWeight: '300',
    },

    '& tbody tr:hover': {
      cursor: 'pointer',
      backgroundColor: '#fffbf2',
    },
  },
}));

type props = {
  attendances: Attendance[];
};

const AttendanceDataTable: FC<props> = ({ attendances = [] }) => {
  const user = useContext(UserContext);
  const { reset, query } = useContext(AttendancesContext);
  const classes = useStyle();
  const [recordForEdit, setRecordForEdit] = useState();
  const [recordForDelete, setRecordForDelete] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { toggleSnack } = useContext(SnackbarContext);

  const openInPopup = (rowData: any) => {
    setRecordForEdit(rowData);
    setOpenPopup(true);
  };

  const openInAlert = (rowData: any) => {
    setRecordForDelete(rowData);
    setOpenAlert(true);
  };

  //  add attendance
  const addOrEdit = async (attendance: Attendance, resetForm: () => void) => {
    //  入力された日に出勤データがあればUPD
    let result: Attendance | null;
    result = await insertOrUpdateAttendance(
      attendance,
      user.user.id,
      user.user.token,
    );
    if (result != null) {
      resetForm();
      setOpenPopup(false);
      console.log('add or edit' + query);
      reset(query);
      toggleSnack(true, 'success', 'データ登録完了');
    } else {
      toggleSnack(true, 'error', '登録失敗');
    }
  };

  //  delete
  const eliminate = async () => {
    const delData = recordForDelete as Attendance;
    let result: number;
    result = await eliminateAttendance(
      user.user.id,
      delData.attendance_date,
      user.user.token,
    );
    if (result >= 200 && result < 300) {
      setOpenAlert(false);
      toggleSnack(true, 'success', 'データ削除完了');
      reset(query);
    } else {
      toggleSnack(true, 'error', '削除失敗 code:' + result);
    }
  };

  return (
    <div className={classes.table}>
      <MaterialTable
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
        data={attendances}
        localization={{
          header: { actions: '' },
        }}
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
      <PopupDialog
        title="新規登録"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AttendanceForm
          attendance={blankAttendance}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </PopupDialog>
      <AlertDialog
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        title="出退勤データ削除"
        message="データを削除してもよろしいですか?"
        handleOnClick={eliminate}
      />
      <SimpleSnackbar />
    </div>
  );
};

export default AttendanceDataTable;
