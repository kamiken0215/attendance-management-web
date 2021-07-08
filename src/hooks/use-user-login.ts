import { useEffect, useState } from 'react';

import { User } from '../services/attendance-management/models/TestUser';
//import { TestUser } from '../services/attendance-management/models/TestUser';

const getUser = async (userName: string, password: string) => {
  const reqBody = {
    email: userName,
    password: password,
  };

  const response = await fetch(`http://118.27.7.5:60800/login`, {
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody),
  });

  if (!response.ok) {
    throw new Error(`${response.status} Error`);
  }

  return response.json();
};

const useUserLogin = (userName: string, password: string) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  //  fetche from api
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const user = await getUser(userName, password);
        setUser(user);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        console.log('--completed--');
      }
      setLoading(false);
    };
    load();
  }, []);

  return { user, loading, error };
};

export default useUserLogin;
