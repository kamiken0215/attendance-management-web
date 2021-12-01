import React, { FC, SyntheticEvent, useContext } from 'react';
import AttendanceSearchFormContainer from './AttendanceSearchFormContainer';
import { Grid } from '@material-ui/core';
import AttendanceDataViewsContentsContainer from './AttendanceDataViewsContainer';
import AttendanceDataTableContainer from './AttendanceDataTableContainer';
import { SelectedDateContext } from './AttendanceContainer';
import { Attendances } from '../../../../entities/Attendances';

type props = {
  data: Attendances[];
};

const AttendanceDataContentsContainer: FC<props> = ({ data = [] }) => {
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  const handleOnClick = (
    targetName: string,
    newValue: string,
    event?: SyntheticEvent,
  ) => {
    if (event) event.persist();
    setSelectedDate(newValue);
  };

  return (
    <div>
      <Grid item xs={12}>
        <div>
          <AttendanceDataViewsContentsContainer
            selectedDate={selectedDate}
            attendances={data}
          />
        </div>
      </Grid>
      <div>
        <Grid item xs={12}>
          <Grid container direction="column" alignItems="stretch">
            <Grid item xs={12}>
              <div>
                <AttendanceSearchFormContainer
                  selectedDate={selectedDate}
                  handleOnSearchButtonClick={handleOnClick}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <AttendanceDataTableContainer attendances={data} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AttendanceDataContentsContainer;
