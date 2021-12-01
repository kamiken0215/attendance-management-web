import { Departments } from 'entities/Departments';
import { defaultPostOrDeleteResponse } from 'entities/PostOrDeleteResponse';
import { RequestDepartments } from 'entities/RequestDepartments';
import { Params } from 'usecase/params';
import { uriBuilder } from 'usecase/uri';

export const DepartmentRepository = () => {
  const defaultResponse = defaultPostOrDeleteResponse;

  const find = async (params: Params, token: string) => {
    let uri = uriBuilder().createDepartmentUri(params);

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
      console.log('--- fetch Department process Completed ---');
    }
  };

  const write = async (token: string, requestBody: RequestDepartments) => {
    const uri = process.env.REACT_APP_DEV_API_URL + `/departments`;

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
      console.log(response);
      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return defaultPostOrDeleteResponse;
    } finally {
      console.log('--- UPDATE department process Completed ---');
    }
  };

  const eliminate = async (params: Params, token: string) => {
    let uri = uriBuilder().createDepartmentUri(params);
    try {
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token,
        },
      });
      return response.json();
    } catch (e) {
      console.log(`エラー発生 ${e as string}`);
      return defaultResponse;
    } finally {
      console.log('--- delete Department process Completed ---');
    }
  };

  return { find, write, eliminate };
};
