import { Attendances } from './Attendances';

export type RequestAttendances = {
  companyId: number;
  attendances: Attendances[];
};

export const blankRequestAttendance = {
  companyId: 0,
  attendances: [],
};
