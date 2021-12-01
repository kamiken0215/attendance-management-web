import { userRepository } from 'repository/userRepository';
import { getLocalStrage } from '../utils/local-strage';
import { decrypt } from '../utils/crypto';

export const loginPageUsecase = () => {
  const fetchUserInfo = async (email: string, password: string) => {
    const user = await userRepository().findLoginUser(email, password);
    return user;
  };

  const fetchToken = async (email: string, password: string) => {
    const token = await userRepository().fetchToken(email, password);
    return token;
  };

  const fetchAuthUser = async (token: string) => {
    const user = await userRepository().findAuthUser(token);
    return user;
  };

  const fetchLocalUserInfo = async () => {
    //local strageからemailとpassを複合
    const encryptedEmail = getLocalStrage('email');
    const encryptedPass = getLocalStrage('id');
    if (!(encryptedEmail && encryptedPass)) {
      return null;
    }

    const user = await userRepository().findLoginUser(
      decrypt(encryptedEmail),
      decrypt(encryptedPass),
    );

    return user;
  };

  return { fetchToken, fetchAuthUser, fetchUserInfo, fetchLocalUserInfo };
};
