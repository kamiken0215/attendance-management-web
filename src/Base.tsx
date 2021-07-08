import React, { FC, useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { User } from './services/attendance-management/models/User';
import { getLocalStrage } from './utils/local-strage';
import findLocalUser from '../src/services/find-local-user';

import App from './App';
import Snackbars from './components/common/atoms/Snackbars';
import SimpleSnackbar from './components/common/atoms/SimpleSnackbar';
import { loginPageUsecase } from './usecase/loginPageUsecase';

const Base: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (getLocalStrage('email') && getLocalStrage('id')) {
      const fetch = async () => {
        const theUser = await loginPageUsecase().fetchLocalUserInfo();
        setUser(theUser);
      };
      fetch();
    }
  }, []);

  return (
    <SnackbarContextProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <App />
      </UserContext.Provider>
    </SnackbarContextProvider>
  );
};

export default Base;
