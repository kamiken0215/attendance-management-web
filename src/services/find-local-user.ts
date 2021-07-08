import { User } from './attendance-management/models/User';
import { getLocalStrage } from '../utils/local-strage';
import { decrypt } from '../utils/crypto';
import getUser from './get-user';

const findLocalUser = async () => {
  let theUser: User | null = null;

  //local strageからemailとpassを複合
  const encryptedEmail = getLocalStrage('email');
  const encryptedPass = getLocalStrage('id');
  if (!(encryptedEmail && encryptedPass)) {
    return null;
  }

  const userData = await getUser(
    decrypt(encryptedEmail),
    decrypt(encryptedPass),
  );
  if (userData) {
    const user = userData as User;
    theUser = user;
  }

  return theUser;
};

export default findLocalUser;
