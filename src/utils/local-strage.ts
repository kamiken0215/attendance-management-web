export const setLocalStrage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStrage = (key: string) => {
  const ret = localStorage.getItem(key);
  if (ret) {
    return ret as string;
  } else {
    return null;
  }
};
