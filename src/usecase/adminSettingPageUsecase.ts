import { Departments } from 'entities/Departments';
import { PostOrDeleteResponse } from 'entities/PostOrDeleteResponse';
import { RequestDepartments } from 'entities/RequestDepartments';
import {
  RequestUser,
  RequestUsers,
  blankRequestUsers,
} from 'entities/RequestUsers';
import { DepartmentRepository } from 'repository/departmentRepository';
import { userRepository } from 'repository/userRepository';
import { blankParams, Params } from './params';

export const adminSettingPageUseCase = () => {
  const writeCompany = async (
    token: string,
    companyId: number,
    users: RequestUser[],
  ) => {
    const requestBody: RequestUsers = blankRequestUsers;
    requestBody.companyId = companyId;
    requestBody.users = users;
    const result = (await userRepository().write(
      token,
      requestBody,
    )) as PostOrDeleteResponse;

    return result;
  };

  const writeDepartment = async (
    token: string,
    requestDepartments: RequestDepartments,
  ) => {
    const requestBody = requestDepartments;
    const result = (await DepartmentRepository().write(
      token,
      requestBody,
    )) as PostOrDeleteResponse;

    return result;
  };

  const eliminateDepartment = async (
    token: string,
    companyId: number,
    departmentCode: string,
  ) => {
    let params: Params = blankParams;
    params.companyId = companyId;
    params.departmentCode = departmentCode;
    const result = (await DepartmentRepository().eliminate(
      params,
      token,
    )) as PostOrDeleteResponse;

    return result;
  };

  const writeAttendanceClass = async (
    token: string,
    companyId: number,
    users: RequestUser[],
  ) => {
    const requestBody: RequestUsers = blankRequestUsers;
    requestBody.companyId = companyId;
    requestBody.users = users;
    const result = (await userRepository().write(
      token,
      requestBody,
    )) as PostOrDeleteResponse;

    return result;
  };

  const eliminateAttendanceClass = async (
    token: string,
    companyId: number,
    users: RequestUser[],
  ) => {
    const requestBody: RequestUsers = blankRequestUsers;
    requestBody.companyId = companyId;
    requestBody.users = users;
    const result = (await userRepository().write(
      token,
      requestBody,
    )) as PostOrDeleteResponse;

    return result;
  };

  return { writeDepartment, eliminateDepartment };
};
