const getUser = async (email: string, password: string) => {
  const reqBody = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(`http://118.27.7.5:60800/login`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    });
    if (!response.ok) {
      console.log(`エラー発生 ${response.status}`);
      return null;
    }
    return response.json();
  } catch (e) {
    console.log(`エラー発生 ${e as string}`);
    return null;
  } finally {
    console.log('--- Login process Completed ---');
  }
};

export default getUser;
