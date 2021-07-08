import { Attendance } from './attendance-management/models/Attendance';
import { formatDatetime } from '../utils/format-tools';
import findAttendances from './find-attendances';

const insertAttendance = async (
  attendance: Attendance,
  userId: string,
  token: string,
) => {
  let uri: string = `http://118.27.7.5:60800/attendances`;

  console.log('POST' + attendance);
  console.log('POST' + userId);
  console.log('POST' + token);

  const formatedStartTime = formatDatetime(
    attendance.attendance_date,
    attendance.start_time,
  );
  console.log('formatedStartTime is ' + formatedStartTime);
  const formatedEndTime = formatDatetime(
    attendance.attendance_date,
    attendance.end_time,
  );
  console.log('formatedEndTime is ' + formatedEndTime);
  //  create req body
  const reqBody = {
    user_id: userId,
    attendance_date: attendance.attendance_date.replace(/-/g, ''),
    start_time: formatedStartTime,
    end_time: formatedEndTime,
    attendance_class: attendance.attendance_class,
    closed_on: 'on',
    on_duty: 'on',
    request_status: 'none',
    notes: attendance.notes,
    created_at: '',
    created_by: userId,
    created_with: '',
    updated_at: '',
    updated_by: userId,
    updated_with: 'PC',
  };
  console.log(reqBody);

  try {
    const response = await fetch(uri, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(reqBody),
    });
    console.log(response);
    if (!response.ok) {
      console.log(`エラー発生 ${response.status}`);
      return null;
    }
    return response.json();
  } catch (e) {
    console.log(`エラー発生 ${e as string}`);
    return null;
  } finally {
    console.log('--- INSERT New Attendance process Completed ---');
  }
};

const updateAttendance = async (
  attendance: Attendance,
  userId: string,
  token: string,
) => {
  let uri: string = `http://118.27.7.5:60800/attendances/${userId}/${attendance.attendance_date.replace(
    /-/g,
    '',
  )}`;

  console.log('PUT' + attendance);
  console.log('PUT' + userId);
  console.log('PUT' + token);

  const formatedStartTime = formatDatetime(
    attendance.attendance_date,
    attendance.start_time,
  );
  console.log('formatedStartTime is ' + formatedStartTime);
  const formatedEndTime = formatDatetime(
    attendance.attendance_date,
    attendance.end_time,
  );
  console.log('formatedEndTime is ' + formatedEndTime);
  //  create req body
  const reqBody = {
    user_id: userId,
    attendance_date: attendance.attendance_date.replace(/-/g, ''),
    start_time: formatedStartTime,
    end_time: formatedEndTime,
    attendance_class: attendance.attendance_class,
    closed_on: 'on',
    on_duty: 'on',
    request_status: 'none',
    notes: attendance.notes,
    created_at: '',
    created_by: userId,
    created_with: '',
    updated_at: '',
    updated_by: userId,
    updated_with: 'PC',
  };
  console.log(reqBody);

  try {
    const response = await fetch(uri, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(reqBody),
    });
    console.log(response);
    if (!response.ok) {
      console.log(`エラー発生 ${response.status}`);
      return null;
    }
    return response.json();
  } catch (e) {
    console.log(`エラー発生 ${e as string}`);
    return null;
  } finally {
    console.log('--- UPDATE New Attendance process Completed ---');
  }
};

const insertOrUpdateAttendance = async (
  attendance: Attendance,
  userId: string,
  token: string,
) => {
  let theAttendances: Attendance | null = null;
  const attendanceData = await findAttendances(
    userId,
    attendance.attendance_date.replace(/-/g, ''),
  );
  //const attendanceData = await insertAttendance(attendance, userId, token);
  if (attendanceData) {
    let result: Attendance;
    if (attendanceData.length == 0) {
      result = await insertAttendance(attendance, userId, token);
    } else {
      result = await updateAttendance(attendance, userId, token);
    }
    //const attendance = attendanceData as Attendance;
    theAttendances = result as Attendance;
  } else {
    console.log('error data is...' + attendanceData);
  }

  return theAttendances;
};

export default insertOrUpdateAttendance;
