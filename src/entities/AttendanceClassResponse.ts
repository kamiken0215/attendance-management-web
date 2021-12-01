import { AttendanceClasses } from './AttendanceClasses';

export type AttendanceClassResponse = {
  attendanceClasses: AttendanceClasses[];
  error: string | null;
};
