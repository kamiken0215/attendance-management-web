import React, { FC, useContext } from 'react';
import { MainPageContext } from '../../../../contexts/MainPageContext';
import { UserContext } from '../../../../contexts/UserContext';
import AdminSettingComponent from '../../../components/Home/Setting/AdminSettingComponent';
import { adminSettingPageUseCase } from '../../../../usecase/adminSettingPageUsecase';
import { blankDepartment, Departments } from '../../../../entities/Departments';
import { PostOrDeleteResponse } from '../../../../entities/PostOrDeleteResponse';
import {
  blankRequestDepartments,
  RequestDepartments,
} from '../../../../entities/RequestDepartments';
const AdminContaniner: FC = () => {
  const { company, departments } = useContext(MainPageContext);
  const { user } = useContext(UserContext);

  const editCompany = (data: any) => {
    alert(data);
  };

  const addOrEditDepartment = (data: any) => {
    const req: RequestDepartments = blankRequestDepartments;

    const departments: Departments[] = [];
    const department = blankDepartment;
    department.companyId = data.companyId;
    department.departmentCode = data.departmentCode;
    department.departmentName = data.departmentName;

    departments.push(department);

    req.companyId = user.companyId;
    req.departments = departments;

    const write = async () => {
      const result = (await adminSettingPageUseCase().writeDepartment(
        user.token,
        req,
      )) as PostOrDeleteResponse;

      console.log(result);

      if (result.ok) {
        alert('更新完了');
      } else {
        alert('失敗');
      }
    };
    write();
  };

  const eliminateDepartment = (data: any) => {
    const department = blankDepartment;
    department.companyId = data.companyId;
    department.departmentCode = data.departmentCode;

    const eliminate = async () => {
      const result = (await adminSettingPageUseCase().eliminateDepartment(
        user.token,
        department.companyId,
        department.departmentCode,
      )) as PostOrDeleteResponse;

      console.log(result);

      if (result.ok) {
        alert('更新完了');
      } else {
        alert(result.message);
      }
    };
    eliminate();
  };

  return (
    <AdminSettingComponent
      company={company}
      editCompany={editCompany}
      departments={departments}
      addOrEditDepartment={addOrEditDepartment}
      eliminateDepartment={eliminateDepartment}
    />
  );
};

export default AdminContaniner;
