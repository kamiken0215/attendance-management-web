import { Attendance } from '../entities/Attendance';

const blankData: Attendance = {
  user_id: '',
  attendance_date: '',
  start_time: '',
  end_time: '',
  on_duty: '',
  attendance_class: '',
  request_status: '',
  notes: '',
  closed_on: '',
  created_at: '',
  created_by: '',
  created_with: '',
  updated_at: '',
  updated_by: '',
  updated_with: '',
};

export const paddingBlankAttendanceDay = (
  attendance: Attendance[],
  year: string,
  month: string,
) => {
  //  年月両方あれば当該年月の日付リストを作成
  let dayList = createDaysArray(year, month);
  let createList: Attendance[] = [];
  let innerIndex = 0;
  //  出勤日がない日付の場合空データを作成し埋める
  for (let index = 0; index < dayList.length; index++) {
    const day = dayList[index];
    let blank = JSON.parse(JSON.stringify(blankData));
    blank.attendance_date = day;
    if (attendance.length == 0) {
      createList[index] = blank;
      continue;
    }
    if (
      attendance.length > innerIndex &&
      attendance[innerIndex].attendance_date == day
    ) {
      createList[index] = attendance[innerIndex];
      innerIndex++;
    } else {
      createList[index] = blank;
    }
  }
  return createList;
};

const createDaysArray = (year: string, month: string): string[] => {
  const numYear: number = Number(year);
  const numMonth: number = Number(month);
  const monthIndex = numMonth - 1;
  const date = new Date(numYear, monthIndex, 1);
  const result = [];
  while (date.getMonth() == monthIndex) {
    result.push(year + month + String(('0' + date.getDate()).slice(-2)));
    date.setDate(date.getDate() + 1);
  }
  return result;
};
