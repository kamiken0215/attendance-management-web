const deleteAttendance = async (
  userId: string,
  date: string,
  token: string,
) => {
  let uri: string = `http://118.27.7.5:60800/attendances/${userId}`;

  if (date.length > 0) {
    uri += `/${date}`;
  }

  try {
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log(response);
    if (!response.ok) {
      console.log(`エラー発生 ${response.status}`);
      return response.status;
    }
    return response.status;
  } catch (e) {
    console.log(`エラー発生 ${e as string}`);
    return null;
  } finally {
    console.log('--- delete Attendances process Completed ---');
  }
};

export default deleteAttendance;
