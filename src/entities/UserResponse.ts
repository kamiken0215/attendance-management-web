import { Users } from './Users';

export type UserResponse = {
  users: Users[];
  error: string | null;
};
