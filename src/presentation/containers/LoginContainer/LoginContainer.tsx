import React, { FC, useContext, useEffect, useReducer } from 'react';
import { loginPageUsecase } from '../../../usecase/loginPageUsecase';
import LoginComponent from '../../components/Login/LoginComponent';
import { UserContext } from '../../../contexts/UserContext';
import { User } from '../../../entities/User';
import { setLocalStrage } from '../../../utils/local-strage';
import { encrypt } from '../../../utils/crypto';

export type LoginState = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: LoginState = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: LoginState, action: Action): LoginState => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const LoginContainer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    const load = async () => {
      const user = await loginPageUsecase().fetchUserInfo(
        state.username,
        state.password,
      );

      if (user) {
        dispatch({
          type: 'loginSuccess',
          payload: 'Login Successfully',
        });
        login(user as User);
      } else {
        dispatch({
          type: 'loginFailed',
          payload: 'Incorrect username or password',
        });
      }
    };

    load();
  };

  const login = (user: User) => {
    setLocalStrage('id', encrypt(state.password));
    setLocalStrage('email', encrypt(state.username));
    setUser(user);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };

  return (
    <LoginComponent
      state={state}
      handleLogin={handleLogin}
      handleKeyPress={handleKeyPress}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
    />
  );
};

export default LoginContainer;
