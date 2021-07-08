export const determineWeekday = (date: string): string => {
  const JapaneseHolidays = require('japanese-holidays');
  let weekend = toDate(date);
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][
    weekend.getDay()
  ];
  //  祝日判定
  if (JapaneseHolidays.isHoliday(weekend)) {
    return 'holiday';
  } else {
    return dayOfWeek;
  }
};

const toDate = (yyyyMMdd: string) => {
  const arr = (
    yyyyMMdd.substr(0, 4) +
    '/' +
    yyyyMMdd.substr(4, 2) +
    '/' +
    yyyyMMdd.substr(6, 2)
  ).split('/');
  return new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]));
};
