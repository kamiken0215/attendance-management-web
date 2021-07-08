import { Attendance } from 'services/attendance-management/models/Attendance';
import { calcTimeDiffernce, settings } from './calc-time-defferece';

type settings = {
  //  小数第n位まで表示
  numberOfDigit: number;
  //  切り上げor切り捨て
  isRoundUp: boolean;
};

export const calcWorkingTime = (attendances: Attendance[]) => {
  let totalWorkTime: number = 0;
  attendances.map((value) => {
    const start = new Date(value.start_time);
    const end = new Date(value.end_time);
    const params = settings;
    //  小数第一位を切り上げ
    params.numberOfDigit = 1;
    params.mathMode = 'round';
    params.timeMode = 'hour';
    params.startTime = start;
    params.endTime = end;
    totalWorkTime += calcTimeDiffernce(params);
  });

  return totalWorkTime;
};
