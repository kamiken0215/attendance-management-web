import { useEffect } from 'react';

//import { User } from '../services/attendance-management/models/TestUser';
//import { TestUser } from '../services/attendance-management/models/TestUser';
//import { UserContext } from '../contexts/UserContext';
import { User } from '../services/attendance-management/models/TestUser';

const fetchUser = async (userName: string, password: string) => {
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

const useGetUser = (user: User) => {
  //const { setUser } = useContext(UserContext);

  const email = user.email;
  const pass = user.password;

  //  fetche from api
  useEffect(() => {
    const load = async () => {
      try {
        const user = await fetchUser(email, pass);
        //setUser(user);
      } catch (err) {
        throw new Error(`${err} Error`);
      } finally {
        console.log('--completed--');
      }
    };
    load();
  }, []);
};

export default useGetUser;
