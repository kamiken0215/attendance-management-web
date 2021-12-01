import React, { FC, useContext } from 'react';
import AttendanceDataViews from '../../../components/Home/Attendance/AttendanceDataViews';
import { calcTotalWorkTime } from '../../../../usecase/attendancePageUsecase';
import { createOvertimeList } from '../../../../utils/create-overtime-list';
import { UserContext } from '../../../../contexts/UserContext';
import { AttendanceStatusContext } from '../../../../contexts/AttendanceStatusContext';
import { MainPageContext } from '../../../../contexts/MainPageContext';
import { Attendances } from '../../../../entities/Attendances';

type props = {
  selectedDate: string;
  attendances: Attendances[];
};

const AttendanceDataViewsContentsContainer: FC<props> = ({
  selectedDate = '',
  attendances = [],
}) => {
  const user = useContext(UserContext);
  const status = useContext(MainPageContext);

  let numOfAttendances;
  let totalWorkedTime;
  let labelList: string[] = [];
  let valueList: number[] = [];
  let totalCount: number = 0;
  let keepingCount: number = 0;
  let nowOnCount: number = 0;
  let finishedCount: number = 0;
  let rejectedCount: number = 0;
  let finishedRate: number = 0;
  console.log(status);
  const statusNames = status.attendanceStatus.map(
    (n) => n.attendanceStatusName,
  );
  let statusCounts: string[] = new Array();

  if (attendances != null) {
    numOfAttendances = String(attendances.length);
    totalWorkedTime = String(calcTotalWorkTime(attendances));
    const { labels, values } = createOvertimeList(
      attendances,
      Number(selectedDate.substring(0, 4)),
      Number(selectedDate.substring(4, 6)),
    );
    labelList = labels;
    valueList = values;
    console.log(valueList);

    // const finishedCount = attendances.filter(
    //   (n) => n.attendanceStatusName == 'on',
    // );

    for (let a of attendances) {
      switch (a.attendanceStatusName) {
        case 'on':
          nowOnCount++;
          totalCount++;
          break;
        case 'off':
          finishedCount++;
          totalCount++;
          break;
        case 'keep':
          keepingCount++;
          totalCount++;
          break;
        case 'reject':
          rejectedCount++;
          totalCount++;
          break;
        default:
          break;
      }
    }

    if (totalCount > 0) {
      finishedRate = Math.round((finishedCount / totalCount) * 100);
    }

    console.log(statusNames);

    for (let i = 0; i < statusNames.length; i++) {
      const a = statusNames[i];
      switch (a) {
        case 'on':
          statusCounts[i] = a + ' :' + nowOnCount + '件';
          break;
        case 'off':
          statusCounts[i] = a + ' :' + finishedCount + '件';
          break;
        case 'keep':
          statusCounts[i] = a + ' :' + keepingCount + '件';
          break;
        case 'reject':
          statusCounts[i] = a + ' :' + rejectedCount + '件';
          break;
        default:
          break;
      }
    }
  }

  const countData: number[] = [
    nowOnCount,
    keepingCount,
    finishedCount,
    rejectedCount,
  ];

  const graphdata = {
    datasets: [
      {
        data: countData,
        backgroundColor: ['#66adff', '#F0CEA0', '#5CF2E8', 'red'],
        borderColor: 'transparent',
      },
    ],
    labels: statusNames,
  };

  return (
    <AttendanceDataViews
      numOfAttendances={numOfAttendances}
      totalWorkedTime={totalWorkedTime}
      paidHolidays={String(user.user.paidHolidays)}
      labelList={labelList}
      valueList={valueList}
      doughnutData={graphdata}
      doughnutRate={String(finishedRate) + '%'}
      doughnutLabels={statusCounts}
    />
  );
};

export default AttendanceDataViewsContentsContainer;
