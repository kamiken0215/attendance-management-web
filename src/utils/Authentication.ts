import CryptoJS from 'crypto-js';
import { User } from 'services/attendance-management/models/TestUser';

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

class Authentication {
  key = '12345678901234567890123456789012';

  Encrypt = (word: string): string => {
    console.log(word + 'crypted is ' + CryptoJS.AES.encrypt(word, this.key));
    return CryptoJS.AES.encrypt(word, this.key).toString();
  };

  Decrypt = (word: string): string => {
    const decrypted = CryptoJS.AES.decrypt(word, this.key);
    console.log(word + ' --decrypt is-- ');
    return decrypted.toString(CryptoJS.enc.Utf8);
  };
  getLocalStrage = (key: string) => {
    const ret = localStorage.getItem(key);
    if (ret) {
      return ret;
    } else {
      return null;
    }
  };

  isLoggedIn = () => this.get('isLoggedIn') === 'true';

  set = (key: string, value: string) => localStorage.setItem(key, value);
  get = (key: string) => this.getLocalStrage(key) as string;

  login = async (email: string, password: string) => {
    let user;
    let error;
    try {
      //user = await fetchUser(email, password);
      const user = {
        id: '999',
        name: 'TEST',
        email: 'TEST@gmail.com',
        password: 'TEST',
        status: '1',
        token: 'TEST',
      } as User;
      if (user) {
        error = null;
        this.set('isLoggedIn', 'true');
        this.set('email', this.Encrypt(user.email));
        this.set('password', this.Encrypt(user.password));
      }
    } catch (err) {
      console.log(err);
      error = err;
    } finally {
      console.log('-- feche completed --');
    }
    return { user, error };
  };

  logout = () => {
    if (this.isLoggedIn()) {
      this.set('isLoggedIn', 'false');
      this.set('email', '');
      this.set('password', '');
    }
  };
}

export default new Authentication();
