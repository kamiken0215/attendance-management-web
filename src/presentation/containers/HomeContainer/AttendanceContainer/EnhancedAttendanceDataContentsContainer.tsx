import React, { FC } from 'react';
import Loader from '../../../components/common/atoms/Loader';
import AttendanceDataContentsContainer from './AttendanceDataContentsContainer';
import { Attendances } from '../../../../entities/Attendances';

type props = {
  loading?: boolean;
  data: Attendances[];
};

const EnhancedAttendanceDataContentsContainer: FC<props> = ({
  loading = false,
  data = [],
}) => {
  return loading ? <Loader /> : <AttendanceDataContentsContainer data={data} />;
};

export default EnhancedAttendanceDataContentsContainer;
