import React, { FC } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from '@material-ui/data-grid';
//import { Attendance } from '../../services/attendance-management/models/Attendance';

// type Props = {
//   attendances?: Attendance[];
// };

const columns: GridColDef[] = [
  // { field: 'id', width: 130 },
  // { field: 'attendance_date', headerName: 'Attendance Date', width: 130 },
  // { field: 'start_time', headerName: 'Start Time', width: 130 },
  // { field: 'end_time', headerName: 'End Time', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue('firstName') || ''} ${
        params.getValue('lastName') || ''
      }`,
  },
];

const handleGetRowId = (e) => {
  return e.uniId;
};

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 15, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 20, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 21, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 22, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 23, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 24, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 25, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 26, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 27, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 28, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 29, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 30, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 31, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
];

const AttendanceDataTable: FC = () => (
  <div>
    <DataGrid
      autoHeight
      components={{
        Toolbar: GridToolbar,
      }}
      rows={rows}
      columns={columns}
      pageSize={31}
      getRowId={handleGetRowId}
      checkboxSelection
    />
  </div>
);

export default AttendanceDataTable;
