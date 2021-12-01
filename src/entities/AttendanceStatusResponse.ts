import { AttendanceStatus } from './AttendanceStatus';

export type AttendanceStatusResponse = {
  attendanceStatuses: AttendanceStatus[];
  error: string | null;
};
