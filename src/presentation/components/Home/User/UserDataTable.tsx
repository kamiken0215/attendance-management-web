import React, { FC } from 'react';
import { Edit, Check, Clear, Delete } from '@material-ui/icons';
import DataTable from '../../../components/common/datatable/DataTable';
import { Users } from '../../../../entities/Users';
import { Departments } from '../../../../entities/Departments';
import { MenuItem, Select } from '@material-ui/core';
import { Roles } from '../../../../entities/Roles';

type props = {
  users: Users[];
  roles: Roles[];
  departments: Departments[];
  rowAddHandler?: (newData: any) => void;
  rowUpdateHandler?: (newData: any, oldData: any) => void;
  rowDeleteHandler?: (oldData: any) => void;
};
const UserDataTable: FC<props> = ({
  users = [],
  roles = [],
  departments = [],
  rowAddHandler,
  rowUpdateHandler,
  rowDeleteHandler,
}) => {
  const mailRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
  return (
    <DataTable
      options={{
        draggable: true,
        filtering: true,
        exportButton: true,
        paging: false,
        headerStyle: { whiteSpace: 'nowrap' },
        maxBodyHeight: '75vh',
      }}
      title="ユーザー"
      totalCount={10}
      columns={[
        {
          title: '部門',
          field: 'departmentName',
          // eslint-disable-next-line react/display-name
          editComponent: ({ value, onChange, rowData }) => (
            <Select
              value={value}
              onChange={(event) => onChange(event.target.value)}
            >
              {departments.map((s) => (
                <MenuItem key={s.departmentCode} value={s.departmentName}>
                  {s.departmentName}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        { title: '会社ID', field: 'companyId', hidden: true },
        { title: 'ユーザーID', field: 'userId', hidden: true },
        {
          title: 'ユーザー名',
          field: 'userName',
          // validate: (rowData) =>
          //   rowData.userName.length > 0
          //     ? { isValid: true }
          //     : { isValid: false, helperText: '1文字以上入力' },
          // // eslint-disable-next-line react/display-name
          // editComponent: ({ value, onChange, rowData }) => (
          //   <input
          //     value={value}
          //     onChange={(event) => onChange(event.target.value)}
          //   >
          //     value
          //   </input>
          // ),
        },
        {
          title: 'メール',
          field: 'email',
          // validate: (rowData) =>
          //   rowData.email.match({ mailRegex })
          //     ? { isValid: true }
          //     : { isValid: false, helperText: '形式が無効です' },
        },
        {
          title: '残り有給',
          field: 'paidHolidays',
          type: 'numeric',
          headerStyle: {
            textAlign: 'left',
          },
          filterCellStyle: {
            textAlign: 'left',
          },
          cellStyle: {
            textAlign: 'left',
          },
        },

        {
          title: '権限',
          field: 'roleName',
          // eslint-disable-next-line react/display-name
          editComponent: ({ value, onChange, rowData }) => (
            <Select
              value={value}
              onChange={(event) => onChange(event.target.value)}
            >
              {roles.map((s) => (
                <MenuItem key={s.roleCode} value={s.roleName}>
                  {s.roleName} : {s.explanation}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: '新パスワード',
          field: 'password',
        },
        {
          title: '有効',
          field: 'isActive',
          // eslint-disable-next-line react/display-name
          editComponent: ({ value, onChange, rowData }) => (
            <Select
              value={value}
              onChange={(event) => onChange(event.target.value)}
            >
              {['on', 'off'].map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value} : {value == 'on' ? '有効' : '無効'}
                </MenuItem>
              ))}
            </Select>
          ),
        },
      ]}
      data={users as any}
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

export default UserDataTable;
