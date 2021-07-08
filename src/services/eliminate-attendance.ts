import { Attendance } from './attendance-management/models/Attendance';
import deleteAttendance from './delete-attendance-byId';

const eliminateAttendance = async (id: string, date: string, token: string) => {
  let status: number = 0;
  const responseStatus = await deleteAttendance(id, date, token);
  if (responseStatus) {
    status = responseStatus;
  }

  return status;
};

export default eliminateAttendance;
