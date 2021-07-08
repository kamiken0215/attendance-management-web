export const userRepository = () => {
  const find = async (email: string, password: string) => {
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

  const write = async (email: string, password: string) => {};

  const eliminate = async (email: string, password: string) => {};

  return { find, write, eliminate };
};
