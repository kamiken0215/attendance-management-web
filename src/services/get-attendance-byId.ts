const getAttendances = async (userId: string, date: string) => {
  let uri: string =
    process.env.REACT_APP_DEV_API_URL + `/attendances/${userId}`;

  if (date.length > 0) {
    uri += `/${date}`;
  }

  try {
    const response = await fetch(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (!response.ok) {
      console.log(`エラー発生 ${response.status}`);
      return null;
    }
    return response.json();
  } catch (e) {
    console.log(`エラー発生 ${e as string}`);
    return null;
  } finally {
    console.log('--- fetch Attendances process Completed ---');
  }
};

export default getAttendances;
