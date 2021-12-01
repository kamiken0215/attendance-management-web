import { attndanceRepository } from 'repository/attndanceRepository';
import { Attendance } from '../entities/Attendance';

import { differenceInMinutes } from 'date-fns';
import { blankParams, Params } from './params';
import { AttendanceResponse } from 'entities/AttendanceResponse';
import { Attendances } from 'entities/Attendances';
import { AttendanceClassRepository } from 'repository/attendanceClassRepository';
import { AttendanceStatusRepository } from 'repository/attendanceStatusRepository';
import { AttendanceClassResponse } from 'entities/AttendanceClassResponse';
import { AttendanceStatusResponse } from 'entities/AttendanceStatusResponse';
import { AttendanceClasses } from 'entities/AttendanceClasses';
import {
  blankRequestAttendance,
  RequestAttendances,
} from 'entities/RequestAttendances';
import { PostOrDeleteResponse } from 'entities/PostOrDeleteResponse';

export const attendancePageUsecase = () => {
  const FAILURE_GET_DATA = 'データを取得できませんでした';

  /**
   * userIdとdateに紐づいた当該月の出勤データ一覧を取得
   * @return 当該月の出勤データ | null
   */
  const fetchAttendances = async (
    companyId: number,
    departmentCode: string,
    userId: number,
    attendanceDate: string,
    token: string,
  ) => {
    let params: Params = blankParams;
    params.companyId = companyId;
    params.departmentCode = departmentCode;
    params.userId = userId;
    params.attendanceDate = attendanceDate;
    const result = await attndanceRepository().find(params, token);

    if (!result) {
      return null;
    }

    const resp: AttendanceResponse[] = result as AttendanceResponse[];
    let attenadnces: Attendances[] = [];
    if (resp.length > 0) {
      attenadnces = resp[0].attendances;
    }
    //const attenadnces: Attendances[] = resp[0].attendances;

    console.log(attenadnces);

    const viewResult = paddingBlankAttendanceDay(
      attenadnces,
      attendanceDate.substring(0, 4),
      attendanceDate.substring(4, 6),
    );
    //  表示用に加工処理したもの
    return viewResult;
  };

  /**
   * userIdとdateに紐づいた当該月の出勤データ一覧を取得
   * @return 出勤していない日を埋めた当該月の出勤データ | null
   */
  const searchAttendance = async (userId: string, date: string) => {
    let params!: Params;
    const result = await attndanceRepository().find(params, '');

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
    token: string,
    companyId: number,
    attenadnces: Attendances[],
  ) => {
    const requestBody: RequestAttendances = blankRequestAttendance;
    requestBody.companyId = companyId;
    requestBody.attendances = attenadnces;
    const result = (await attndanceRepository().write(
      token,
      requestBody,
    )) as PostOrDeleteResponse;

    return result;
  };

  /**
   * 指定の出勤データの削除を行う
   * @return response status code | null
   */
  const eliminateAttendances = async (
    companyId: number,
    departmentCode: string,
    userId: number,
    attendanceDate: string,
    token: string,
  ) => {
    let params: Params = blankParams;
    params.companyId = companyId;
    params.departmentCode = departmentCode;
    params.userId = userId;
    params.attendanceDate = attendanceDate;
    const result = (await attndanceRepository().eliminate(
      params,
      token,
    )) as PostOrDeleteResponse;

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

const blankData: Attendances = {
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

/**
 * 出勤日がない日付の場合空の出勤データを作成し埋める
 * @return {Attendance[]}
 */
const paddingBlankAttendanceDay = (
  attendance: Attendances[],
  year: string,
  month: string,
) => {
  //  年月両方あれば当該年月の日付リストを作成
  let dayList = createDaysArray(year, month);
  let createList: Attendances[] = [];
  let innerIndex = 0;
  //  出勤日がない日付の場合空データを作成し埋める
  for (let index = 0; index < dayList.length; index++) {
    const day = dayList[index];
    let blank = JSON.parse(JSON.stringify(blankData));
    blank.attendanceDate = day;
    if (attendance.length == 0) {
      createList[index] = blank;
      continue;
    }
    if (
      attendance.length > innerIndex &&
      attendance[innerIndex].attendanceDate == day
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
 * 勤怠時間の差を計算し、分を返す
 * @param base 引かれる時間
 * @param minus 引く時間
 * @return {number} 時間差(分)
 */
export const calcDifferenceMinute = (base: Date, minus: Date) => {
  return Math.round(differenceInMinutes(new Date(base), new Date(minus)) / 60);
};

/**
 * 残業時間を計算し、分を返す
 * @param base 引かれる時間
 * @param minus 引く時間
 * @param baseWorkingTime 基準労働時間
 * @return {number} 時間差(分)
 */
export const calcOverTime = (
  base: Date,
  minus: Date,
  baseWorkingTime: number,
): number => {
  return Math.round(differenceInMinutes(base, minus) / 60) - baseWorkingTime;
};

/**
 * 出勤データから勤怠時間を計算する
 * @param {Attendance[]} 出勤データリスト
 * @return {number} 総出勤時間
 */
export const calcTotalWorkTime = (attenadnces: Attendances[]) => {
  let total: number = 0;
  attenadnces.map((value) => {
    console.log(total);
    if (value.endTime != null && value.startTime != null) {
      total += Math.round(
        differenceInMinutes(
          new Date(value.endTime),
          new Date(value.startTime),
        ) / 60,
      );
    }
  });
  return total;
};

/**
 * 与えられた出勤データリストから指定月の残業時間リストを作成する
 * @param {Attendance[]} attendance[] 残業時間を表示したい月の出勤データリスト(降順)
 * @param {Number} year 計算したい年
 * @param {Number} month 計算したい月
 * @return {{labels,values}} labels:labelのリスト values:labelに対応するvalueのリスト
 */
export const createOvertimeList = (
  attendances: Attendances[],
  year: number,
  month: number,
) => {
  const baseTime = 8;
  let labels: string[] = [];
  let values: number[] = [];

  const ldt = new Date(year, month, 0);
  console.log(ldt);

  const yy = String(ldt.getFullYear());
  const mm = ('00' + (ldt.getMonth() + 1)).slice(-2);
  const lastDay = ('00' + ldt.getDate()).slice(-2);
  let inner = 0;

  for (let day = 1; day <= Number(lastDay); day++) {
    let dd = ('0' + String(day)).slice(-2);
    const yyyyMMdd = String(yy) + mm + dd;
    if (
      attendances[inner] != null &&
      attendances[inner].attendanceDate == yyyyMMdd
    ) {
      values.push(
        calcOverTime(
          new Date(attendances[inner].startTime as Date),
          new Date(attendances[inner].endTime as Date),
          baseTime,
        ),
      );

      inner++;
    } else {
      values.push(0);
    }
    labels.push(String(day));
  }

  return { labels, values };
};

/**
 * yyyy/MM/dd HH:mm -> yyyy-MM-dd HH:mm:ss
 * @param date yyyy/MM/dd
 * @param time HH:mm
 * @return {string} yyyy-MM-dd HH:mm:ss
 */
export const formatDatetime = (date: string, time: string): string => {
  let formatedDay: string = date;
  let formatedTime: string = time;

  if (!date.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
    formatedDay = formatedDay.replace('/', '-');
  }

  if (!time.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)) {
    formatedTime = formatedTime + ':00';
  }

  return formatedDay + ' ' + formatedTime;
};

/**
 * yyyyMMdd -> yyyy-MM-ddに変換する
 * @param str yyyyMMdd
 * @return {string} yyyy-MM-dd
 */
export const formatToDate = (str: string): string => {
  console.log(str);

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
  let date: string = str;

  return date.slice(-8);
};

/**
 * 管理画面の入力フォームで入力された出勤データをAPI連携用に加工する
 * @param formData 入力フォームで入力された出勤データ
 * @return {Attendance} 加工後出勤データ
 */
export const formatFromData = (formData: Attendance): Attendances => {
  let data: Attendances = blankData;

  //  出勤日(yyyy/MM/dd) -> yyyy/MM/dd

  return data;
};

export const validate = (attendance: Attendance) => {
  if (attendance.user_id.length > 7) {
    return 'user id must less than 7';
  }

  //  attendance_date Date(yyyyMMdd)
  if (!attendance.attendance_date.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
    return 'attendance_date format is yyyyMMdd';
  }

  //  start_time and end_time Date(yyyy-MM-dd HH:mm:ss)
  if (
    !attendance.start_time.match(
      /[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/,
    ) ||
    !attendance.end_time.match(
      /[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/,
    )
  ) {
    return 'start_time and end_time format is yyyy-MM-dd HH:mm:ss';
  }

  //  on_duty varchar (on | off)
  const onDutyArray = ['on', 'off'];
  if (!onDutyArray.includes(attendance.on_duty)) {
    return 'on duty must on or off';
  }

  //  attendance_class varchar
  if (!isNaN(Number(attendance.attendance_class))) {
    return 'attendance class must num';
  }

  if (0 > Number(attendance.attendance_class)) {
    return 'attendance class must over 0';
  }

  //  request_status varchar (no | ok | waiting | none)

  const statusArray = ['no', 'ok', 'waiting', 'none'];

  if (!statusArray.includes(attendance.request_status)) {
    return 'status must no | ok | waiting | none';
  }

  //  note varchar(200)
  if (attendance.notes.length > 200) {
    return 'note must under 200 chars';
  }

  return '';
};
