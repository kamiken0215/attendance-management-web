import { defaultPostOrDeleteResponse } from 'entities/PostOrDeleteResponse';
import { RequestAttendances } from 'entities/RequestAttendances';
import { Params } from 'usecase/params';
import { uriBuilder } from 'usecase/uri';

export const attndanceRepository = () => {
  const defaultResponse = defaultPostOrDeleteResponse;
  /**
   * userIdに紐づいた出勤データ一覧を取得
   * @param date(yyyyMMdd) 日付指定がない場合はuserIdに紐づいた全ての出勤データを取得
   * @return attendance | null
   */
  const find = async (params: Params, token: string) => {
    let uri = uriBuilder().createAttendanceUri(params);

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
      console.log('--- fetch Attendances process Completed ---');
    }
  };

  /**
   * 1.出勤データの存在チェック
   * 2.存在していればupdate
   * 3.存在していなければinsert
   * @param attendance 更新/登録する出勤データ
   */
  const write = async (token: string, requestBody: RequestAttendances) => {
    const uri = process.env.REACT_APP_DEV_API_URL + `/attendances`;

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
      console.log('--- UPDATE Attendance process Completed ---');
    }
  };

  /**
   * userIdと日付に紐づいた出勤データ一覧を削除
   * @param date(yyyyMMdd) 日付指定がない場合はuserIdに紐づいた全ての出勤データを削除
   * @return response status | null
   */
  const eliminate = async (params: Params, token: string) => {
    let uri = uriBuilder().createAttendanceUri(params);

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
      console.log('--- delete Attendances process Completed ---');
    }
  };

  return { find, write, eliminate };
};
