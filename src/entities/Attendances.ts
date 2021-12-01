export type Attendances = {
  companyId: number | null;
  departmentCode: string | null;
  userId: number | null;
  userName: string | null;
  attendanceDate: string | null;
  startTime: Date | null;
  endTime: Date | null;
  attendanceClassCode: string | null;
  attendanceClassName: string | null;
  attendanceStatusCode: string | null;
  attendanceStatusName: string | null;
};

export const blankData: Attendances = {
  companyId: null,
  departmentCode: null,
  userId: null,
  userName: null,
  attendanceDate: null,
  startTime: null,
  endTime: null,
  attendanceClassCode: null,
  attendanceClassName: null,
  attendanceStatusCode: null,
  attendanceStatusName: null,
};
