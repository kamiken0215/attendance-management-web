import React, { FC, useContext, useEffect, useState } from 'react';
import PageHeader from '../../components/common/header/PageHeader';
import MainTemplate from '../../components/Home/Home';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { UserContext } from '../../contexts/UserContext';
import { AttendancesContext } from '../../contexts/AttendancesContext';
import { Grid } from '@material-ui/core';
import useGetAttendances from '../../hooks/use-getAttendances';
import { format } from 'date-fns';
import MainContainer from './MainContainer';
import getAttendances from '../../services/get-attendance-byId';
import AttendanceContainer from '../../presentation/containers/HomeContainer/AttendanceContainer/AttendanceContainer';

const EnhancedHome: FC = () => {
  // const user = useContext(UserContext);
  // const [attendances, setAttendances] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const { data, loading } = useGetAttendances(
  //   user.user.id,
  //   format(new Date(), 'yyyyMM'),
  // );

  // useEffect(() => {
  //   if (data) {
  //     setAttendances(data);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   setSelectedDate(format(new Date(), 'yyyyMM'));
  // }, []);

  // const reset = (date: string) => {
  //   const load = async () => {
  //     const response = await getAttendances(user.user.id, date);
  //     if (response) {
  //       setAttendances(response);
  //     } else {
  //       setAttendances([]);
  //     }
  //   };
  //   load();
  // };

  // const setSelectedDate = (date: string) => {

  // };

  return (
    <MainTemplate>
      {/* <Grid container direction="column" alignItems="stretch">
        <Grid item xs={12}>
          <PageHeader
            title={user.user.name}
            subTitle={user.user.email}
            icon={<EventNoteIcon fontSize="large" />}
          />
        </Grid>
        <AttendancesContext.Provider
          value={{
            attendances,
            setAttendances,
            reset,
            selectedDate,
            setSelectedDate,
          }}
        >
          <MainContainer />
        </AttendancesContext.Provider>
      </Grid> */}
      <AttendanceContainer></AttendanceContainer>
    </MainTemplate>
  );
};

export default EnhancedHome;
