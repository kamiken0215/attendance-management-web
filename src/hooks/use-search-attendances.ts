import { useCallback, useEffect, useState } from 'react';
import { Attendance } from 'services/attendance-management/models/Attendance';
import getAttendances from 'services/get-attendance-byId';
import { paddingBlankAttendanceDay } from 'utils/paddingBlankAttendanceDay';
import findAttendances from '../services/find-attendances';

const useSearchAttendances = (id: string, q: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Attendance[]>([]);

  useEffect(() => {
    console.count(useSearchAttendances.name);
    const load = async () => {
      if (q.length >= 1) {
        setLoading(true);
        const response = await findAttendances(id, q);

        if (response) {
          const ret = paddingBlankAttendanceDay(
            response,
            q.substring(0, 4),
            q.substring(4, 6),
          );
          setData(ret);
        } else {
          setData([]);
        }

        setLoading(false);
      } else {
        setData([]);
      }
    };

    load();
  }, [q]);

  return { data, loading };
};

export default useSearchAttendances;
