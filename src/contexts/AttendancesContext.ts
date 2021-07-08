import { createContext } from 'react';
import { Attendance } from '../entities/Attendance';

type AttendancesContextValue = {
  attendances: Attendance[] | null;
  setAttendances: React.Dispatch<any>;
  query: string;
  setQuery: (query: string) => void;
  reset: (query: string) => void;
};

export const AttendancesContext = createContext<AttendancesContextValue>({
  attendances: null,
  setAttendances: () => {},
  query: '',
  setQuery: (query: string) => {},
  reset: (query: string) => {},
});
