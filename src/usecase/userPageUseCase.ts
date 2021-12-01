import { PostOrDeleteResponse } from 'entities/PostOrDeleteResponse';
import {
  RequestUser,
  RequestUsers,
  blankRequestUsers,
} from 'entities/RequestUsers';
import { UserResponse } from 'entities/UserResponse';
import { Users } from 'entities/Users';
import { userRepository } from 'repository/userRepository';
import { blankParams, Params } from './params';

export const userPageUseCase = () => {
  const fetchUsers = async (
    companyId: number,
    departmentCode: string,
    userId: number,
    token: string,
  ) => {
    let params: Params = blankParams;
    params.companyId = companyId;
    params.departmentCode = departmentCode;
    params.userId = userId;
    const result = await userRepository().find(params, token);

    if (!result) {
      return null;
    }

    const resp: UserResponse = result as UserResponse;
    console.log(userPageUseCase.name);
    if (resp.error == null) {
      return resp.users as Users[];
    } else {
      console.log(resp.error);
      return [];
    }
  };

  const writeUser = async (
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

  const eliminateUser = async (
    companyId: number,
    departmentCode: string,
    userId: number,
    token: string,
  ) => {
    let params: Params = blankParams;
    params.companyId = companyId;
    params.departmentCode = departmentCode;
    params.userId = userId;
    const result = (await userRepository().eliminate(
      params,
      token,
    )) as PostOrDeleteResponse;

    return result;
  };

  return { fetchUsers, writeUser, eliminateUser };
};
