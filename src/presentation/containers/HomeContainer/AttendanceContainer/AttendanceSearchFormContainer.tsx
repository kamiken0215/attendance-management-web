import React, { FC } from 'react';
import AttendanceSearchForm from '../../../components/Home/Attendance/AttendanceSearchForm';

type props = {
  selectedDate: string;
  handleOnSearchButtonClick?: (targetName: string, newValue: string) => void;
};

const AttendanceSearchFormContainer: FC<props> = ({
  selectedDate = '',
  handleOnSearchButtonClick = () => undefined,
}) => {
  return (
    <AttendanceSearchForm
      selectedDate={selectedDate}
      handleOnClick={handleOnSearchButtonClick}
    />
  );
};

export default AttendanceSearchFormContainer;
