import { AttendanceClasses } from 'entities/AttendanceClasses';
import { createContext } from 'react';
import { User } from '../entities/User';
import { Users } from '../entities/Users';

type AttendanceClassesContextValue = {
  attendanceClasses: AttendanceClasses[] | null;
  setAttendanceClasses: React.Dispatch<
    React.SetStateAction<AttendanceClasses | null>
  >;
};

export const AttendanceClassesContext = createContext<AttendanceClassesContextValue>(
  {
    attendanceClasses: null,
    setAttendanceClasses: () => {},
  },
);
