import { AttendanceClasses } from 'entities/AttendanceClasses';
import { AttendanceStatus } from 'entities/AttendanceStatus';
import { Companies } from 'entities/Companies';
import { Departments } from 'entities/Departments';
import { Roles } from 'entities/Roles';
import { createContext } from 'react';

type MainPageContextValue = {
  company: Companies | null;
  setCompany: React.Dispatch<React.SetStateAction<Companies | null>>;
  roles: Roles[] | null;
  setRoles: React.Dispatch<React.SetStateAction<Roles | null>>;
  departments: Departments[] | null;
  setDepartments: React.Dispatch<React.SetStateAction<Departments | null>>;
  attendanceStatus: AttendanceStatus[] | null;
  setAttendanceStatus: React.Dispatch<
    React.SetStateAction<AttendanceStatus | null>
  >;
  attendanceClasses: AttendanceClasses[] | null;
  setAttendanceClasses: React.Dispatch<
    React.SetStateAction<AttendanceClasses | null>
  >;
};

export const MainPageContext = createContext<MainPageContextValue>({
  company: null,
  setCompany: () => {},
  roles: null,
  setRoles: () => {},
  departments: null,
  setDepartments: () => {},
  attendanceStatus: null,
  setAttendanceStatus: () => {},
  attendanceClasses: null,
  setAttendanceClasses: () => {},
});
