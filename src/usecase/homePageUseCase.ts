import { AttendanceClassResponse } from 'entities/AttendanceClassResponse';
import { AttendanceStatusResponse } from 'entities/AttendanceStatusResponse';
import { CompanyResponse } from 'entities/CompanyResponse';
import { DepartmentResponse } from 'entities/DepartmentsResponse';
import { RoleResponse } from 'entities/RoleResponse';
import { AttendanceClassRepository } from 'repository/attendanceClassRepository';
import { AttendanceStatusRepository } from 'repository/attendanceStatusRepository';
import { CompanyRepository } from 'repository/CompanyRepository';
import { DepartmentRepository } from 'repository/departmentRepository';
import { RoleRepository } from 'repository/RoleRepository';
import { Params, blankParams } from './params';

export const homePageUsecase = () => {
  const fetchCompanyAndDepartment = async (
    companyId: number,
    token: string,
  ) => {
    const result = await CompanyRepository().find(companyId, token);

    if (!result) {
      return null;
    }

    const resp: CompanyResponse = result as CompanyResponse;
    return resp;
  };

  const fetchRoles = async (token: string) => {
    const result = await RoleRepository().find(token);

    if (!result) {
      return null;
    }

    const resp: RoleResponse = result as RoleResponse;
    return resp;
  };

  const fetchAttendanceStatus = async (token: string) => {
    const result = await AttendanceStatusRepository().find(token);

    if (!result) {
      return null;
    }

    const resp: AttendanceStatusResponse = result as AttendanceStatusResponse;
    return resp;
  };

  const fetchAttendanceClasses = async (
    companyId: number,
    attendanceClassCode: string,
    token: string,
  ) => {
    let params: Params = blankParams;
    params.companyId = companyId;
    params.attendanceClassCode = attendanceClassCode;
    const result = await AttendanceClassRepository().find(params, token);

    if (!result) {
      return null;
    }

    const resp: AttendanceClassResponse = result as AttendanceClassResponse;

    return resp;
  };

  const fetchDepartment = async (
    companyId: number,
    departmentCode: string,
    token: string,
  ) => {
    let params: Params = blankParams;
    params.companyId = companyId;
    params.departmentCode = departmentCode;
    const result = await DepartmentRepository().find(params, token);

    if (!result) {
      return null;
    }

    const resp: DepartmentResponse = result as DepartmentResponse;

    return resp;
  };

  return {
    fetchCompanyAndDepartment,
    fetchRoles,
    fetchAttendanceClasses,
    fetchAttendanceStatus,
    fetchDepartment,
  };
};
