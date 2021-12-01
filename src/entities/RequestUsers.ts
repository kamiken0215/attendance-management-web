import { Users } from './Users';

export type RequestUser = {
  companyId: number;
  userId: number;
  userName: string;
  email: string;
  password: string | null;
  paidHolidays: number;
  isActive: string;
  departmentCode: string;
  departmentName: string;
  roleCode: string;
};

export const blankRequestUser: RequestUser = {
  companyId: 0,
  userId: 0,
  userName: '',
  email: '',
  password: null,
  paidHolidays: 0,
  isActive: '',
  departmentCode: '',
  departmentName: '',
  roleCode: '',
};

export type RequestUsers = {
  companyId: number;
  users: RequestUser[];
};

export const blankRequestUsers = {
  companyId: 0,
  users: [],
};

export type SearchUserParams = {
  departmentCode: string;
  userId: number;
};
