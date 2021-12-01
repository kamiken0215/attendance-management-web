import { Params } from 'usecase/params';
import { uriBuilder } from 'usecase/uri';

export const AttendanceClassRepository = () => {
  const find = async (params: Params, token: string) => {
    let uri = uriBuilder().createAttendanceClassUri(params);

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
      console.log('--- fetch Attendances class process Completed ---');
    }
  };

  const write = async (email: string, password: string) => {};

  const eliminate = async (email: string, password: string) => {};

  return { find, write, eliminate };
};
