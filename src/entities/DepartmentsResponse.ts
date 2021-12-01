import { Departments } from './Departments';

export type DepartmentResponse = {
  departments: Departments[];
  error: string;
};
