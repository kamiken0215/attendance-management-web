import { Departments } from './Departments';

export type RequestDepartments = {
  companyId: number;
  departments: Departments[];
};

export const blankRequestDepartments = {
  companyId: 0,
  departments: [],
};
