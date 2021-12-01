export const CompanyRepository = () => {
  const find = async (companyId: number, token: string) => {
    const uri = process.env.REACT_APP_DEV_API_URL + `/companies/${companyId}`;

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
      console.log('--- fetch Role process Completed ---');
    }
  };

  return { find };
};
