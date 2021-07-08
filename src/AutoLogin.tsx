import Authentication from './utils/Authentication';

const useAutoLogin = (email: string, password: string) => {
  const load = async () => {
    const { user, error } = await Authentication.login(email, password);

    console.log(error);
    return user;
  };

  load();
};

export default useAutoLogin;
