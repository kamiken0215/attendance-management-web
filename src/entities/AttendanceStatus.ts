export type AttendanceStatus = {
  attendanceStatusCode: string;
  attendanceStatusName: string;
};

export const getAttendanceStatusCodeByName = (
  statusArray: AttendanceStatus[],
  statusName: string,
) => {
  for (const c of statusArray) {
    if (c.attendanceStatusName.match(statusName)) {
      return c.attendanceStatusCode;
    }
  }
};
