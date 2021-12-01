import { defaultPostOrDeleteResponse } from 'entities/PostOrDeleteResponse';
import { Params } from 'usecase/params';
import { uriBuilder } from 'usecase/uri';

export const AttendanceStatusRepository = () => {
  const find = async (token: string) => {
    const uri = process.env.REACT_APP_DEV_API_URL + `/status`;

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
      console.log('--- fetch Attendances Status process Completed ---');
    }
  };

  return { find };
};
