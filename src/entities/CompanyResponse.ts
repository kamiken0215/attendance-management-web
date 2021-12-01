import { Departments } from './Departments';
import { Roles } from './Roles';

export type CompanyResponse = {
  companyId: number;
  companyName: string;
  departments: Departments[];
  error: string | null;
};
