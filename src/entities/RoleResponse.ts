import { Roles } from './Roles';

export type RoleResponse = {
  roles: Roles[];
  error: string | null;
};
