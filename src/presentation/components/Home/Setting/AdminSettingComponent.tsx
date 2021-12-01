import React, { FC } from 'react';
import CompanySettingComponent from './CompanySettingComponent';
import DepartmentSettingComponent from './DepartmentSettingComponent';
import AttendanceSettingComponent from './AttendanceClassSettingComponent';
import { Companies } from '../../../../entities/Companies';
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
} from '@material-ui/core';
import { Departments } from '../../../../entities/Departments';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: '#838383',
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    content: {
      flexGrow: 1,
      backgroundColor: '#393E46',
      color: '#EEE',
      '& .MuiInput-underline': {
        width: '70%',
        '&::before': {
          color: '#EEE',
        },
        '&::after': {
          color: '#EEE',
        },
      },
      '& Input': {
        color: '#EEE',
      },
      '& Button': {
        margin: theme.spacing(2),
        width: '10rem',
        color: '#fff',
        background: '#fe6f13',
        border: '#fff',
        '&:hover': {
          background: '#eee',
          color: '#fe6f13',
        },
      },
    },
  }),
);

type Props = {
  company: Companies;
  editCompany: (data: any) => void;
  departments: Departments[];
  addOrEditDepartment: (data: any) => void;
  eliminateDepartment: (data: any) => void;
};

const AdminSettingComponent: FC<Props> = ({
  company,
  editCompany,
  departments,
  addOrEditDepartment,
  eliminateDepartment,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.title}>Company</div>
      <div className={classes.content}>
        <CompanySettingComponent company={company} editComapny={editCompany} />
      </div>
      <Divider />

      <div className={classes.title}>Department</div>
      <div>
        <DepartmentSettingComponent
          departments={departments}
          rowAddHandler={addOrEditDepartment}
          rowUpdateHandler={addOrEditDepartment}
          rowDeleteHandler={eliminateDepartment}
        />
      </div>
      <div>
        <AttendanceSettingComponent />
      </div>
    </div>
  );
};

export default AdminSettingComponent;
