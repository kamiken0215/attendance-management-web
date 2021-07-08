import CryptoJS from 'crypto-js';

export const decrypt = (word: string): string => {
  const key = process.env.REACT_APP_ENCRYPTION_KEY as string;
  const decrypted = CryptoJS.AES.decrypt(word, key);
  console.log(
    word + ' --decrypt is-- ' + decrypted.toString(CryptoJS.enc.Utf8),
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encrypt = (word: string): string => {
  const key = process.env.REACT_APP_ENCRYPTION_KEY as string;
  console.log(word + 'crypted is ' + CryptoJS.AES.encrypt(word, key));
  return CryptoJS.AES.encrypt(word, key).toString();
};
