import React, { FC } from 'react';
import StatusCard from './StatusCard';
import Loader from '../atoms/Loader';

type props = {
  isLoading?: boolean;
  header: string;
  text: string;
  icon: string;
  iconcolor: string;
};

const EnhancedStatusCard: FC<props> = ({
  isLoading = false,
  header = '',
  text = '',
  icon = '',
  iconcolor = '',
}) => {
  //isLoading = true;
  return isLoading ? (
    <Loader />
  ) : (
    <StatusCard header={header} text={text} icon={icon} iconcolor={iconcolor} />
  );
};

export default EnhancedStatusCard;
