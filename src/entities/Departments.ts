export type Departments = {
  companyId: number;
  departmentCode: string;
  departmentName: string;
};

export const blankDepartment: Departments = {
  companyId: 0,
  departmentCode: '',
  departmentName: '',
};

export const getDepartmentCodeByName = (
  departments: Departments[],
  departmentName: string,
) => {
  console.log('対象部門名' + departmentName);
  for (const d of departments) {
    if (d.departmentName.match(departmentName)) {
      return d.departmentCode;
    }
  }
};
