import React, { FC, useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import HomeContainer from './presentation/containers/HomeContainer/HomeContainer';
import LoginContainer from './presentation/containers/LoginContainer/LoginContainer';

const App: FC = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <LoginContainer />;
  } else {
    return <HomeContainer />;
  }
};

export default App;
