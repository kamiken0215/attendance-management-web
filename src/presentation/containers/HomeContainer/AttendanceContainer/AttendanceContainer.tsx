import React, { createContext, FC, useContext, useState } from 'react';
import EnhancedAttendanceDataContentsContainer from './EnhancedAttendanceDataContentsContainer';
import useFetchAttendance from '../../../hooks/use-fetch-attendance';
import { UserContext } from '../../../../contexts/UserContext';
import { format } from 'date-fns';

type SelectedDateContext = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectedDateContext = createContext({} as SelectedDateContext);

const AttendanceContainer: FC = () => {
  const user = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyyMM'),
  );

  const { data, loading } = useFetchAttendance(user.user.id, selectedDate);

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      <EnhancedAttendanceDataContentsContainer loading={loading} data={data} />
    </SelectedDateContext.Provider>
  );
};

export default AttendanceContainer;
