import { Attendance } from '../entities/Attendance';
import { formatDatetime } from '../utils/format-tools';

export const attndanceRepository = () => {
  /**
   * userIdに紐づいた出勤データ一覧を取得
   * @param date(yyyyMMdd) 日付指定がない場合はuserIdに紐づいた全ての出勤データを取得
   * @return attendance | null
   */
  const find = async (userId: string, date: string) => {
    let uri: string =
      process.env.REACT_APP_DEV_API_URL + `/attendances/${userId}`;

    if (date.length > 0) {
      uri += `/${date}`;
    }

    console.log('***** api ***** ' + uri);

    try {
      const response = await fetch(uri, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      }
      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return null;
    } finally {
      console.log('--- fetch Attendances process Completed ---');
    }
  };

  /**
   * 1.出勤データの存在チェック
   * 2.存在していればupdate
   * 3.存在していなければinsert
   * @param attendance 更新/登録する出勤データ
   */
  const write = async (
    userId: string,
    token: string,
    attendance: Attendance,
  ) => {
    let theAttendances: Attendance | null = null;
    const attendanceData = await find(
      userId,
      attendance.attendance_date.replace(/-/g, ''),
    );
    if (attendanceData) {
      let result: Attendance;
      if (attendanceData.length == 0) {
        result = await insertAttendance(attendance, userId, token);
      } else {
        result = await updateAttendance(attendance, userId, token);
      }
      theAttendances = result as Attendance;
    } else {
      console.log('error data is...' + attendanceData);
    }

    return theAttendances;
  };

  /**
   * userIdと日付に紐づいた出勤データ一覧を削除
   * @param date(yyyyMMdd) 日付指定がない場合はuserIdに紐づいた全ての出勤データを削除
   * @return response status | null
   */
  const eliminate = async (userId: string, date: string, token: string) => {
    let uri: string =
      process.env.REACT_APP_DEV_API_URL + `attendances/${userId}`;

    if (date.length > 0) {
      uri += `/${date}`;
    }

    try {
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      }
      return response.status;
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return null;
    } finally {
      console.log('--- delete Attendances process Completed ---');
    }
  };

  return { find, write, eliminate };
};

const insertAttendance = async (
  attendance: Attendance,
  userId: string,
  token: string,
) => {
  let uri: string = process.env.REACT_APP_DEV_API_URL + `/attendances`;

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
      throw new Error(`${response.status} Error`);
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
  let uri: string =
    process.env.REACT_APP_DEV_API_URL +
    `/attendances/${userId}/${attendance.attendance_date.replace(/-/g, '')}`;

  const formatedStartTime = formatDatetime(
    attendance.attendance_date,
    attendance.start_time,
  );
  const formatedEndTime = formatDatetime(
    attendance.attendance_date,
    attendance.end_time,
  );
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
      throw new Error(`${response.status} Error`);
    }
    return response.json();
  } catch (e) {
    console.log(`エラー発生 ${e as string}`);
    return null;
  } finally {
    console.log('--- UPDATE New Attendance process Completed ---');
  }
};
