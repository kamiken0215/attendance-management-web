import { Attendance } from '../entities/Attendance';
import { calcTimeDiffernce, settings } from './calc-time-defferece';

export const calcOverTime = (attendance: Attendance, baseTime: number) => {
  let diff: number = 0;
  const start = new Date(attendance.start_time);
  const end = new Date(attendance.end_time);
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
