import {
  Button,
  CardContent,
  Grid,
  Input,
  makeStyles,
} from '@material-ui/core';
import { Edit, Check, Clear, Delete } from '@material-ui/icons';
import React, { FC } from 'react';
import { Companies } from '../../../../entities/Companies';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Departments } from '../../../../entities/Departments';

import DataTable from '../../../components/common/datatable/DataTable';

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#bf1650',
    fontSize: '1rem',
    fontWeight: 600,
  },
}));

type props = {
  departments: Departments[];
  rowAddHandler?: (newData: any) => void;
  rowUpdateHandler?: (newData: any, oldData: any) => void;
  rowDeleteHandler?: (oldData: any) => void;
};

const DepartmentSettingComponent: FC<props> = ({
  departments,
  rowAddHandler,
  rowUpdateHandler,
  rowDeleteHandler,
}) => {
  return (
    <div>
      <div>
        <CardContent>
          <DataTable
            options={{
              draggable: false,
              filtering: false,
              exportButton: false,
              paging: false,
              headerStyle: { whiteSpace: 'nowrap' },
              maxBodyHeight: '75vh',
              rowStyle: (rowData) => ({
                backgroundColor: '#eee',
                color: '#000',
              }),
            }}
            columns={[
              { title: '部門コード', field: 'departmentCode' },
              { title: '部門名', field: 'departmentName' },
            ]}
            data={departments as any}
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
        </CardContent>
      </div>
    </div>
  );
};

export default DepartmentSettingComponent;
