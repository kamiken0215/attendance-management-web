import { parse } from 'date-fns';

export type AttendanceClasses = {
  companyId: number;
  attendanceClassCode: string;
  attendanceClassName: string;
  startTime: string;
  endTime: string;
};

export const getAttendanceClasseCodeByName = (
  classes: AttendanceClasses[],
  className: string,
) => {
  for (const c of classes) {
    if (c.attendanceClassName.match(className)) {
      return c.attendanceClassCode;
    }
  }
};

export const getAttendanceClassStartTimeAndEndTimeByName = (
  classes: AttendanceClasses[],
  className: string,
) => {
  for (const c of classes) {
    if (c.attendanceClassName.match(className)) {
      return [c.startTime, c.endTime];
    }
  }
};

export const isOverClassStartTime = (
  classes: AttendanceClasses[],
  className: string,
  startTime: Date,
) => {
  //  startTimeの日付部分を取得
  const day = String(startTime).slice(0, 10);
  for (const c of classes) {
    if (c.attendanceClassName.match(className)) {
      return new Date(day + ' ' + c.startTime) < new Date(startTime);
    }
  }
};

export const isUnderClassEndTime = (
  classes: AttendanceClasses[],
  className: string,
  endTime: Date,
) => {
  //  endTimeの日付部分を取得
  const day = String(endTime).slice(0, 10);

  for (const c of classes) {
    if (c.attendanceClassName.match(className)) {
      return new Date(day + ' ' + c.endTime) > new Date(endTime);
    }
  }
};
