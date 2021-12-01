import { createContext } from 'react';
import { User } from '../entities/User';
import { Users } from '../entities/Users';

type UserContextValue = {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});
