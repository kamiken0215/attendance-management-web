import React, { FC, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { getLocalStrage } from './utils/local-strage';

import App from './App';
import { loginPageUsecase } from './usecase/loginPageUsecase';
import { Users } from './entities/Users';
import { UserResponse } from './entities/UserResponse';

const Base: FC = () => {
  const [user, setUser] = useState<Users | null>(null);

  useEffect(() => {
    // if (getLocalStrage('email') && getLocalStrage('id')) {
    //   const fetch = async () => {
    //     const theUser = await loginPageUsecase().fetchLocalUserInfo();
    //     setUser(theUser);
    //   };
    //   fetch();
    // }
    const token: string = getLocalStrage('token');
    if (token) {
      const fetch = async () => {
        const theUser = (await loginPageUsecase().fetchAuthUser(
          token,
        )) as UserResponse;

        if (theUser) {
          theUser.users[0].token = token;
          setUser(theUser.users[0]);
        }
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
