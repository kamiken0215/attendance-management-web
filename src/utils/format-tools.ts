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

export const formatToDate = (str: string): string => {
  // yyyyMMdd -> yyyy-MM-dd
  let yyyyMMdd: string = str;

  return [
    yyyyMMdd.slice(0, 4),
    '-',
    yyyyMMdd.slice(4, 6),
    '-',
    yyyyMMdd.slice(6, 8),
  ].join('');
};

export const formatToTime = (str: string): string => {
  // yyyyMMdd HH:mm:SS -> HH:mm:SS
  let date: string = str;

  return date.slice(-8);
};
