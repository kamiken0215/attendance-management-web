import { Departments } from './Departments';

export type Companies = {
  companyId: number;
  companyName: string;
  departments: Departments[] | null;
};

export const blankCompany = {
  companyId: 0,
  companyName: '',
  departments: [],
};
