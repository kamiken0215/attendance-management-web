import React, { FC, useContext } from 'react';
import { Route, Router, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import HomeContainer from './presentation/containers/HomeContainer/HomeContainer';
import LoginContainer from './presentation/containers/LoginContainer/LoginContainer';

const App: FC = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <LoginContainer />;
  } else {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomeContainer} exact />
            <Route path="/login" component={LoginContainer} exact />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
