import CryptoJS from 'crypto-js';

export const decrypt = (word: string): string => {
  const key = JSON.stringify(process.env.REACT_APP_ENCRYPTION_KEY);
  const decrypted = CryptoJS.AES.decrypt(word, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encrypt = (word: string): string => {
  const key = JSON.stringify(process.env.REACT_APP_ENCRYPTION_KEY);
  return CryptoJS.AES.encrypt(word, key).toString();
};
