import React, { FC } from 'react';
import AttendanceContainer from './AttendanceContainer/AttendanceContainer';
import HomeComponent from '../../components/Home/HomeComponent';

const HomeContainer: FC = () => {
  return (
    <HomeComponent>
      <AttendanceContainer />
    </HomeComponent>
  );
};

export default HomeContainer;
