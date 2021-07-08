import { useCallback, useEffect, useState } from 'react';
import { Attendance } from 'services/attendance-management/models/Attendance';
import getAttendances from 'services/get-attendance-byId';

const useGetAttendances = (userId: string, date: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Attendance[] | null>(null);

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const response = await getAttendances(userId, date);
      if (response) {
        setData(response);
      } else {
        setData([]);
      }
    };
    load();
    setLoading(false);
  }, []);

  // const getData = (userId: string, date: string) =>
  //   useCallback(async () => {
  //     setLoading(true);
  //     const response = await getAttendances(userId, date);
  //     setData(response.data);
  //     setLoading(false);
  //   }, []);
  return { data, loading };
};

export default useGetAttendances;
