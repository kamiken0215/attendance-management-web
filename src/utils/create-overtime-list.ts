import { Attendance } from '../entities/Attendance';
import { Attendances } from '../entities/Attendances';
import { calcOverTime } from './calc-overtime';

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
      values.push(calcOverTime(attendances[inner], baseTime));

      inner++;
    } else {
      values.push(0);
    }
    labels.push(String(day));
  }

  return { labels, values };
};
