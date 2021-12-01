import { Departments } from 'entities/Departments';
import { createContext } from 'react';

type DepartmentContextValue = {
  departments: Departments[] | null;
  setDepartments: React.Dispatch<React.SetStateAction<Departments | null>>;
};

export const DepartmentContext = createContext<DepartmentContextValue>({
  departments: null,
  setDepartments: () => {},
});
