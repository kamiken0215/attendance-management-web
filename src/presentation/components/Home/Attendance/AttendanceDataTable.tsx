import React, { FC } from 'react';
import { Edit, Check, Clear, Delete } from '@material-ui/icons';
import DataTable from '../../../components/common/datatable/DataTable';
import { determineWeekday } from '../../../../utils/determine-weekday';
import { Attendances } from '../../../../entities/Attendances';
import {
  AttendanceClasses,
  isOverClassStartTime,
  isUnderClassEndTime,
} from '../../../../entities/AttendanceClasses';
import { MenuItem, Select } from '@material-ui/core';
import {
  CheckCircle,
  Block,
  ErrorOutline,
  PauseCircleOutline,
} from '@material-ui/icons';
import { AttendanceStatus } from '../../../../entities/AttendanceStatus';
import { format, isValid, parse } from 'date-fns';
import ja from 'date-fns/locale/ja';

type props = {
  attendances: Attendances[];
  attendanceClasses: AttendanceClasses[];
  attendanceStatus: AttendanceStatus[];
  rowAddHandler?: (newData: any) => void;
  rowUpdateHandler?: (newData: any, oldData: any) => void;
  rowDeleteHandler?: (oldData: any) => void;
};
const AttendanceDataTable: FC<props> = ({
  attendances = [],
  attendanceClasses,
  attendanceStatus,
  rowAddHandler,
  rowUpdateHandler,
  rowDeleteHandler,
}) => {
  return (
    <DataTable
      options={{
        draggable: true,
        filtering: true,
        exportButton: true,
        print: true,
        paging: false,
        actionsColumnIndex: -1,
        headerStyle: { whiteSpace: 'nowrap' },
        maxBodyHeight: '75vh',
        rowStyle: (rowData) => ({
          backgroundColor:
            determineWeekday(rowData.attendanceDate) == 'holiday' ||
            determineWeekday(rowData.attendanceDate) == '日'
              ? '#fff1f8'
              : determineWeekday(rowData.attendanceDate) == '土'
              ? '#E8F5FF'
              : '#ffffff',
          color:
            determineWeekday(rowData.attendanceDate) == 'holiday' ||
            determineWeekday(rowData.attendanceDate) == '日'
              ? '#ff0080'
              : determineWeekday(rowData.attendanceDate) == '土'
              ? '#0091ff'
              : '#000',
        }),
      }}
      title="出退勤データ"
      columns={[
        { title: 'ユーザー', field: 'userId', hidden: true },
        {
          title: '出勤日',
          field: 'attendanceDate',
          editable: 'never',
          render: (rowData) =>
            format(
              parse(rowData.attendanceDate, 'yyyyMMdd', new Date()),
              'M月d日(E)',
              { locale: ja },
            ),
        },
        {
          title: '出勤時間',
          field: 'startTime',
          render: (rowData) =>
            rowData.startTime == null
              ? ''
              : format(new Date(rowData.startTime), 'yyyy-MM-dd kk:mm:ss'),
          validate: (rowData) =>
            isValid(parse(rowData.startTime, 'yyyy-MM-dd kk:mm:ss', new Date()))
              ? isOverClassStartTime(
                  attendanceClasses,
                  rowData.attendanceClassName,
                  rowData.startTime,
                )
                ? { isValid: false, helperText: '有効範囲ではありません' }
                : true
              : { isValid: false, helperText: 'yyyy-MM-dd hh:mm:ss' },
        },
        {
          title: '退勤時間',
          field: 'endTime',
          render: (rowData) =>
            rowData.endTime == null
              ? ''
              : format(new Date(rowData.endTime), 'yyyy-MM-dd kk:mm:ss'),
          validate: (rowData) =>
            isValid(parse(rowData.endTime, 'yyyy-MM-dd kk:mm:ss', new Date()))
              ? isUnderClassEndTime(
                  attendanceClasses,
                  rowData.attendanceClassName,
                  rowData.endTime,
                )
                ? { isValid: false, helperText: '有効範囲ではありません' }
                : true
              : { isValid: false, helperText: 'yyyy-MM-dd hh:mm:ss' },
        },
        {
          title: '出勤区分',
          field: 'attendanceClassName',
          // eslint-disable-next-line react/display-name
          editComponent: ({ value, onChange, rowData }) => (
            <Select
              value={value}
              onChange={(event) => onChange(event.target.value)}
            >
              {attendanceClasses.map((s) => (
                <MenuItem
                  key={s.attendanceClassName}
                  value={s.attendanceClassName}
                >
                  {'[' +
                    s.attendanceClassName +
                    ']  ' +
                    s.startTime +
                    ' ~ ' +
                    s.endTime}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: 'ステータス',
          field: 'attendanceStatusName',
          // eslint-disable-next-line react/display-name
          render: (rowData) =>
            rowData.attendanceStatusName == 'off' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                }}
              >
                <CheckCircle
                  style={{ color: '#67d351', marginRight: '2rem' }}
                />
                <p>off</p>
              </div>
            ) : rowData.attendanceStatusName == 'reject' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                }}
              >
                <Block style={{ color: '#c5294b', marginRight: '2rem' }} />
                <p>reject</p>
              </div>
            ) : rowData.attendanceStatusName == 'keep' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                }}
              >
                <PauseCircleOutline
                  style={{ color: '#ebc342', marginRight: '2rem' }}
                />
                <p>keep</p>
              </div>
            ) : rowData.attendanceStatusName == 'on' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                }}
              >
                <ErrorOutline
                  style={{ color: '#c5294b', marginRight: '2rem' }}
                />
                <p>on</p>
              </div>
            ) : (
              <div />
            ),

          // eslint-disable-next-line react/display-name
          editComponent: ({ value, onChange, rowData }) => (
            <Select
              value={value}
              onChange={(event) => onChange(event.target.value)}
            >
              {attendanceStatus.map((s) => (
                <MenuItem
                  key={s.attendanceStatusName}
                  value={s.attendanceStatusName}
                >
                  {s.attendanceStatusName}
                </MenuItem>
              ))}
            </Select>
          ),
        },
      ]}
      data={attendances as any}
      rowAddHandler={rowAddHandler}
      rowUpdateHandler={rowUpdateHandler}
      rowDeleteHandler={rowDeleteHandler}
      icons={{
        // eslint-disable-next-line react/display-name
        Edit: React.forwardRef((props, ref) => (
          <Edit style={{ color: '#fd7013' }} {...props} ref={ref} />
        )),
        // eslint-disable-next-line react/display-name
        Delete: React.forwardRef((props, ref) => (
          <Delete style={{ color: 'grey' }} {...props} ref={ref} />
        )),
        // eslint-disable-next-line react/display-name
        Check: React.forwardRef((props, ref) => (
          <Check style={{ color: 'green' }} {...props} ref={ref} />
        )),
        // eslint-disable-next-line react/display-name
        Clear: React.forwardRef((props, ref) => (
          <Clear style={{ color: 'red' }} {...props} ref={ref} />
        )),
      }}
    />
  );
};

export default AttendanceDataTable;
