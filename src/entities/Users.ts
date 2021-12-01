export type Users = {
  userId: number;
  userName: string;
  email: string;
  password: string | null;
  paidHolidays: number;
  isActive: isActive;
  companyId: number;
  companyName: string;
  departmentCode: string;
  departmentName: string;
  roleCode: string;
  roleName: string;
  token: string;
};

export const blankUser = {
  userId: 0,
  userName: '',
  email: '',
  password: '',
  paidHolidays: 0,
  isActive: 'off',
  companyId: 0,
  companyName: '',
  departmentCode: '',
  departmentName: '',
  roleCode: '',
  roleName: '',
  token: '',
};

type isActive = {
  on: string;
  off: string;
};
