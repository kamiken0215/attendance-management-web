import React, { FC } from 'react';
import { Users } from '../../../../entities/Users';
import Loader from '../../../components/common/atoms/Loader';
import UserDataTableContainer from './UserDataTableContainer';

type Props = {
  data: Users[];
  loading?: boolean;
};

const EnhancedUserDataTableContainer: FC<Props> = ({
  loading = false,
  data = [],
}) => {
  return loading ? <Loader /> : <UserDataTableContainer users={data} />;
};

export default EnhancedUserDataTableContainer;
