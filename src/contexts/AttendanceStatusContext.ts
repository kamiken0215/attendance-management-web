import { AttendanceClasses } from 'entities/AttendanceClasses';
import { AttendanceStatus } from 'entities/AttendanceStatus';
import { createContext } from 'react';
import { User } from '../entities/User';
import { Users } from '../entities/Users';

type AttendanceStatusContextValue = {
  attendanceStatus: AttendanceStatus[] | null;
  setAttendanceStatus: React.Dispatch<
    React.SetStateAction<AttendanceStatus | null>
  >;
};

export const AttendanceStatusContext = createContext<AttendanceStatusContextValue>(
  {
    attendanceStatus: null,
    setAttendanceStatus: () => {},
  },
);
