export type Attendance = {
  user_id: string;
  attendance_date: string;
  start_time: string;
  end_time: string;
  on_duty: string;
  attendance_class: string;
  request_status: string;
  notes: string;
  closed_on: string;
  created_at: string;
  created_by: string;
  created_with: string;
  updated_at: string;
  updated_by: string;
  updated_with: string;
};

export type AddIdAttendance = {
  user_id: string;
  attendance_date: string;
  start_time: string;
  end_time: string;
  on_duty: string;
  attendance_class: string;
  request_status: string;
  notes: string;
  closed_on: string;
  created_at: string;
  created_by: string;
  created_with: string;
  updated_at: string;
  updated_by: string;
  updated_with: string;
  id: string;
};

export const blankAttendance: Attendance = {
  user_id: '',
  attendance_date: '',
  start_time: '',
  end_time: '',
  on_duty: '',
  attendance_class: '',
  request_status: '',
  notes: '',
  closed_on: '',
  created_at: '',
  created_by: '',
  created_with: '',
  updated_at: '',
  updated_by: '',
  updated_with: '',
};

export const getAttendanceOptions = () => [
  { id: '1', title: '出勤' },
  { id: '2', title: '退勤' },
  { id: '3', title: '有給' },
  { id: '4', title: '休出' },
];
