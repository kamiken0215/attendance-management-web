import { Attendance } from './attendance-management/models/Attendance';
import getAttendances from './get-attendance-byId';

const findAttendances = async (id: string, date: string) => {
  let theAttendances: Attendance[] | null = null;
  const attendanceData = await getAttendances(id, date);
  console.log('find data is ...' + attendanceData);
  if (attendanceData) {
    const attendance = attendanceData as Attendance[];
    theAttendances = attendance;
  }

  return theAttendances;
};

export default findAttendances;
