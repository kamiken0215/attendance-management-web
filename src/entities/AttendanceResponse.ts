import { Attendances } from './Attendances';

export type AttendanceResponse = {
  userId: number;
  attendances: Attendances[];
  error: string | null;
};
