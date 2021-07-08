import { User } from './attendance-management/models/User';
import getUser from './get-user';
import { setLocalStrage } from '../utils/local-strage';
import { encrypt } from '../utils/crypto';

const findUser = async (email: string, password: string) => {
  let theUser: User | null = null;
  const userData = await getUser(email, password);
  if (userData) {
    const user = userData as User;
    //local strageにセット
    setLocalStrage('email', encrypt(email));
    setLocalStrage('id', encrypt(password));
    theUser = user;
  }

  return theUser;
};

export default findUser;
