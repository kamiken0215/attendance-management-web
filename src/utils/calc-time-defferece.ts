type calcTimeDiffSettings = {
  //  小数第n位まで表示
  numberOfDigit: number;
  //  切り上げor切り捨て
  mathMode: 'round' | 'ceil' | 'floor';
  //  表示形式
  timeMode: 'hour' | 'minute' | 'seconde';
  startTime: Date;
  endTime: Date;
};

export const settings: calcTimeDiffSettings = {
  numberOfDigit: 0.1,
  mathMode: 'round',
  timeMode: 'hour',
  startTime: new Date(),
  endTime: new Date(),
};

export const calcTimeDiffernce = (params: calcTimeDiffSettings) => {
  let time = 0;
  let divider = 0;

  const start = new Date(params.startTime);
  const end = new Date(params.endTime);

  switch (params.timeMode) {
    case 'hour':
      divider = 60 * 60 * 1000;
      break;
    case 'minute':
      divider = 60 * 60;
      break;
    case 'seconde':
      divider = 60;
  }

  switch (params.mathMode) {
    case 'round':
      time = orgRound(
        (end.getTime() - start.getTime()) / divider,
        params.numberOfDigit,
      );
      break;
    case 'ceil':
      time = orgCeil(
        (end.getTime() - start.getTime()) / divider,
        params.numberOfDigit,
      );
      break;
    case 'floor':
      time = orgFloor(
        (end.getTime() - start.getTime()) / divider,
        params.numberOfDigit,
      );
      break;
  }

  return time;
};

/**
 * 任意の桁で四捨五入する関数
 * @param {number} value 四捨五入する数値
 * @param {number} base どの桁で四捨五入するか（10→10の位、0.1→小数第１位）
 * @return {number} 四捨五入した値
 */
const orgRound = (value: number, base: number) => {
  return Math.round(value * base) / base;
};

/**
 * 任意の桁で切り上げする関数
 * @param {number} value 切り上げする数値
 * @param {number} base どの桁で切り上げするか（10→10の位、0.1→小数第１位）
 * @return {number} 切り上げした値
 */
const orgCeil = (value: number, base: number) => {
  return Math.ceil(value * base) / base;
};

/**
 * 任意の桁で切り捨てする関数
 * @param {number} value 切り捨てする数値
 * @param {number} base どの桁で切り捨てするか（10→10の位、0.1→小数第１位）
 * @return {number} 切り捨てした値
 */
const orgFloor = (value: number, base: number) => {
  return Math.floor(value * base) / base;
};
