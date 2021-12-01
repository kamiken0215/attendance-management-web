import { useEffect, useState } from 'react';
import { Attendance } from '../../entities/Attendance';
import { attendancePageUsecase } from 'usecase/attendancePageUsecase';
import { Attendances } from 'entities/Attendances';

/**
 * qが変更されるたびに検索をおこない結果データを返す
 * @param userId
 * @param q yyyyMM
 * @return Attendances[] | null
 */
const useFetchAttendance = (
  companyId: number,
  departmentCode: string,
  userId: number,
  q: string,
  token: string,
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Attendances[]>([]);

  useEffect(() => {
    setLoading(true);
    console.log('***** q is *****' + q);
    const load = async () => {
      if (q.length >= 1) {
        const response = (await attendancePageUsecase().fetchAttendances(
          companyId,
          departmentCode,
          userId,
          q,
          token,
        )) as Attendances[];
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
