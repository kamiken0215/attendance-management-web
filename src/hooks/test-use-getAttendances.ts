import { useEffect, useState } from 'react';
import { Attendance } from 'services/attendance-management/models/Attendance';
import getAttendances from 'services/get-attendance-byId';

const useTestGetAttendances = (userId: string, date: string) => {
  const [data, setData] = useState<Attendance[] | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await getAttendances(userId, date);
      if (response) {
        setData(response);
      } else {
        setData([]);
      }
    };
    load();
  }, []);

  // const getData = (userId: string, date: string) =>
  //   useCallback(async () => {
  //     setLoading(true);
  //     const response = await getAttendances(userId, date);
  //     setData(response.data);
  //     setLoading(false);
  //   }, []);
  return { data };
};

export default useTestGetAttendances;
