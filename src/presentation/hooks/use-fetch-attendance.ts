import { useEffect, useState } from 'react';
import { Attendance } from 'services/attendance-management/models/Attendance';
import { attendancePageUsecase } from 'usecase/attendancePageUsecase';

/**
 * qが変更されるたびに検索をおこない結果データを返す
 * @param userId
 * @param q yyyyMM
 * @return Attendances[] | null
 */
const useFetchAttendance = (userId: string, q: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Attendance[]>([]);

  useEffect(() => {
    setLoading(true);
    console.log('***** q is *****' + q);
    const load = async () => {
      if (q.length >= 1) {
        const response = (await attendancePageUsecase().fetchAttendances(
          userId,
          q,
        )) as Attendance[];
        if (response) {
          setData(response);
        } else {
          setData([]);
        }
      } else {
        setData([]);
      }

      setLoading(false);
    };
    load();
  }, [q]);

  return { data, loading };
};

export default useFetchAttendance;
