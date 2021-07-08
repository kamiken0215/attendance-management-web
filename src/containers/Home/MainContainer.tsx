import React, { FC, useContext } from 'react';
import Loader from '../../components/common/atoms/Loader';
import Contents from './ContentsContainer';
import { AttendancesContext } from '../../contexts/AttendancesContext';
import { Grid } from '@material-ui/core';
import AttendanceDataHeader from '../../components/common/header/AttendanceDataHeader';

const MainContainer: FC = () => {
  const { attendances } = useContext(AttendancesContext);
  if (!attendances) {
    return <Loader />;
  } else {
    return (
      <div>
        <Grid item xs={12}>
          <AttendanceDataHeader />
        </Grid>
        <Grid item xs={12}>
          <Contents />
        </Grid>
      </div>
    );
  }
};

export default MainContainer;
