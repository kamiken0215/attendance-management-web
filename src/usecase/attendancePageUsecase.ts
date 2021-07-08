import { attndanceRepository } from 'repository/attndanceRepository';
import { Attendance } from '../entities/Attendance';

import { format, differenceInMinutes } from 'date-fns';

export const attendancePageUsecase = () => {
  /**
   * userIdとdateに紐づいた当該月の出勤データ一覧を取得
   * @return 当該月の出勤データ | null
   */
  const fetchAttendances = async (userId: string, date: string) => {
    const result = await attndanceRepository().find(userId, date);

    if (!result) {
      return null;
    }
    const viewResult = paddingBlankAttendanceDay(
      result,
      date.substring(0, 4),
      date.substring(4, 6),
    );
    //  表示用に加工処理
    return viewResult;
  };

  /**
   * userIdとdateに紐づいた当該月の出勤データ一覧を取得
   * @return 出勤していない日を埋めた当該月の出勤データ | null
   */
  const searchAttendance = async (userId: string, date: string) => {
    const result = await attndanceRepository().find(userId, date);

    if (!result) {
      return null;
    }

    return result;
  };

  /**
   * 指定の出勤データの更新もしくは新規作成を行う
   * @return attendance | null
   */
  const writeAttendance = async (
    userId: string,
    token: string,
    attendance: Attendance,
  ) => {
    const result = await attndanceRepository().write(userId, token, attendance);
    return result;
  };

  /**
   * 指定の出勤データの削除を行う
   * @return response status code | null
   */
  const eliminateAttendances = async (
    userId: string,
    date: string,
    token: string,
  ) => {
    const result = await attndanceRepository().eliminate(userId, date, token);

    return result;
  };

  const validate = (attendance: Attendance) => {
    let result = '';
    if (attendance.user_id.length > 6) {
      result = 'user id length is over 6';
      return result;
    }
    if (!attendance.attendance_date.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
      let date = attendance.attendance_date;
      date.trim();
      date.replace(/\//g, '');
      date.replace(/-/g, '');
      if (date.length != 8) {
        result = 'date format is incorrect';
        return result;
      }
    }

    return result;
  };

  return {
    fetchAttendances,
    searchAttendance,
    writeAttendance,
    eliminateAttendances,
    validate,
  };
};

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

/**
 * 出勤日がない日付の場合空データを作成し埋める
 * @return {Attendance[]}
 */
const paddingBlankAttendanceDay = (
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

/**
 * 当該年月の日づけリストを作成
 * @return {[]} yyyyMMdd
 */
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

/**
 * 出勤データから勤怠時間を計算する
 * @param {Attendance[]} 出勤データリスト
 * @return {number} 総出勤時間
 */
const calcTotalWorkTime = (attenadnces: Attendance[]) => {
  let total: number = 0;
  attenadnces.map((value) => {
    total +=
      differenceInMinutes(
        new Date(value.end_time),
        new Date(value.start_time),
      ) / 60;
  });
  return total;
};

/**
 * yyyyMMdd HH:mm:ss形式に変換する
 * @param date yyyyMMdd
 * @param time HH:mm:ss
 * @return {string} yyyyMMdd HH:mm:ss
 */
export const formatDatetime = (date: string, time: string): string => {
  let formatedDay: string = date;
  let formatedTime: string = time;

  //  パターンで整形
  if (!date.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
    formatedDay = formatedDay.replace('/', '-');
  }

  if (!time.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)) {
    formatedTime = formatedTime + ':00';
  }

  return formatedDay + ' ' + formatedTime;
};

/**
 * yyyy-MM-ddに変換する
 * @param str yyyyMMdd
 * @return {string} yyyy-MM-dd
 */
export const formatToDate = (str: string): string => {
  let yyyyMMdd: string = str;

  return [
    yyyyMMdd.slice(0, 4),
    '-',
    yyyyMMdd.slice(4, 6),
    '-',
    yyyyMMdd.slice(6, 8),
  ].join('');
};

/**
 * yyyyMMdd HH:mm:SS -> HH:mm:SS
 * @param str yyyyMMdd HH:mm:SS
 * @return {string} HH:mm:SS
 */
export const formatToOnlyTime = (str: string): string => {
  // yyyyMMdd HH:mm:SS -> HH:mm:SS
  let date: string = str;

  return date.slice(-8);
};
