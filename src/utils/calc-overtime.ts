import { Attendance } from '../entities/Attendance';
import { Attendances } from '../entities/Attendances';
import { calcTimeDiffernce, settings } from './calc-time-defferece';

export const calcOverTime = (attendance: Attendances, baseTime: number) => {
  let diff: number = 0;
  const start = new Date(attendance.startTime as Date);
  const end = new Date(attendance.endTime as Date);
  const params = settings;
  //  小数第一位を切り上げ
  params.numberOfDigit = 10;
  params.mathMode = 'round';
  params.timeMode = 'hour';
  params.startTime = start;
  params.endTime = end;

  diff = calcTimeDiffernce(params);
  if (diff > baseTime) {
    return diff - baseTime;
  } else {
    return 0;
  }
};
