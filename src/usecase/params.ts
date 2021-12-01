export const blankParams = {
  companyId: null,
  departmentCode: null,
  userId: null,
  attendanceClassCode: null,
  attendanceDate: null,
};

export type Params = {
  companyId: number | null;
  departmentCode: string | null;
  userId: number | null;
  attendanceClassCode: string | null;
  attendanceDate: string | null;
};
