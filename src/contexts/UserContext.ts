import { createContext } from 'react';
import { User } from '../services/attendance-management/models/User';

type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});
