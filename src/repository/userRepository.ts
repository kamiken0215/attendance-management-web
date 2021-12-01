import { defaultPostOrDeleteResponse } from 'entities/PostOrDeleteResponse';
import { RequestUsers } from 'entities/RequestUsers';
import { Params } from 'usecase/params';
import { uriBuilder } from 'usecase/uri';

export const userRepository = () => {
  const defaultResponse = defaultPostOrDeleteResponse;

  const findLoginUser = async (email: string, password: string) => {
    const reqBody = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_URL + `/login`,
        {
          mode: 'cors',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody),
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      }

      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return null;
    } finally {
      console.log('--- fetch user process Completed ---');
    }
  };

  const findAuthUser = async (token: string) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_URL + `/auth/token`,
        {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      }

      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return null;
    } finally {
      console.log('--- fetch user process Completed ---');
    }
  };

  const fetchToken = async (email: string, password: string) => {
    const reqBody = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_URL + `/auth`,
        {
          mode: 'cors',
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(reqBody),
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      }

      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return null;
    } finally {
      console.log('--- fetch user process Completed ---');
    }
  };

  const find = async (params: Params, token: string) => {
    let uri = uriBuilder().createUserUri(params);

    console.log('***** api ***** ' + uri);

    try {
      const response = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      }
      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return null;
    } finally {
      console.log('--- fetch Users process Completed ---');
    }
  };

  const write = async (token: string, requestBody: RequestUsers) => {
    const uri = process.env.REACT_APP_DEV_API_URL + `/users`;

    console.log('***** api ***** ' + uri);

    console.log('***** request ***** ' + requestBody);

    try {
      const response = await fetch(uri, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(requestBody),
      });
      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return defaultPostOrDeleteResponse;
    } finally {
      console.log('--- UPDATE User process Completed ---');
    }
  };

  const eliminate = async (params: Params, token: string) => {
    let uri = uriBuilder().createUserUri(params);

    console.log('***** api ***** ' + uri);

    try {
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return defaultPostOrDeleteResponse;
    } finally {
      console.log('--- delete User process Completed ---');
    }
  };

  return { find, findLoginUser, findAuthUser, fetchToken, write, eliminate };
};
