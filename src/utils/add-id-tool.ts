import {
  AddIdAttendance,
  Attendance,
} from '../services/attendance-management/models/Attendance';

export const addIdToMap = (attendances: AddIdAttendance[]) => {
  let att: AddIdAttendance[] = attendances;
  for (let i = 0; i < attendances.length; i++) {
    let arr = attendances[i];
    arr.id = i.toString();
    console.log('attendans is -- ' + arr);
    att.concat(arr);
  }
  //   for (let i = 0; i < arrys.length; i++) {
  //     let map = arrys[i] as Attendance;
  //     console.log('map is ---' + map);
  //   }
  return att;
};
