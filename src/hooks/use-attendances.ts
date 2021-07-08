import { useEffect, useState } from 'react';

import {
  AddIdAttendance,
  Attendance,
} from '../services/attendance-management/models/Attendance';

const getAttendances = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

const useAttendances = (id: string, date: string) => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getAttendances(
        `http://118.27.7.5:60800/attendances/${id}/${date}`,
      );

      console.log('---data--- ' + data);
      //const attendancesData = JSON.parse(json);
      setAttendances(data as AddIdAttendance[]);
      setError(null);
    };

    load();
  }, []);

  return [attendances, error];
};

export default useAttendances;
