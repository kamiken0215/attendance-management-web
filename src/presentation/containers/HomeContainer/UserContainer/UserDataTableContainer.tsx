import React, { FC, useContext } from 'react';
import { Users } from '../../../../entities/Users';
import {
  RequestUser,
  blankRequestUser,
  blankRequestUsers,
} from '../../../../entities/RequestUsers';
// import { RequestUser } from '../../../../entities/RequestUsers';
import UserDataTable from '../../../components/Home/User/UserDataTable';
import {
  Departments,
  getDepartmentCodeByName,
} from '../../../../entities/Departments';
import { MainPageContext } from '../../../../contexts/MainPageContext';
import { getRoleCodeByName } from '../../../../entities/Roles';
import { userPageUseCase } from '../../../../usecase/userPageUseCase';
import { UserContext } from '../../../../contexts/UserContext';
import { PostOrDeleteResponse } from '../../../../entities/PostOrDeleteResponse';
import { blankUser } from '../../../../entities/Users';

type props = {
  users: Users[];
};

const UserDataTableContainer: FC<props> = ({ users = [] }) => {
  console.count(UserDataTableContainer.name);
  const { departments, roles } = useContext(MainPageContext);
  const { user } = useContext(UserContext);

  const rowAddHandler = (newData: any) => {
    const departmentCode = getDepartmentCodeByName(
      departments,
      newData.departmentName,
    );
    newData.departmentCode = departmentCode;

    const roleCode = getRoleCodeByName(roles, newData.roleName);
    newData.roleCode = roleCode;

    console.log('new Data is ' + newData);

    let data = blankRequestUser;
    data.companyId = user.companyId;
    data.userId = 0;
    data.userName = newData.userName as string;
    data.email = newData.email as string;
    data.paidHolidays = newData.paidHolidays as number;
    data.password = newData.password as string;
    data.isActive = newData.isActive as string;
    if (newData.password === undefined || newData.password == null) {
      data.password = null;
    } else {
      data.password = newData.password as string;
    }

    data.departmentCode = departmentCode;
    data.departmentName = newData.departmentName as string;
    data.roleCode = roleCode;
    let users: RequestUser[] = new Array();
    users.push(data);

    console.log('req user is ' + data);

    const update = async () => {
      const result = (await userPageUseCase().writeUser(
        user.token,
        user.companyId,
        users,
      )) as PostOrDeleteResponse;

      console.log(result);

      if (result.ok) {
        alert('更新完了');
      } else {
        alert('失敗');
      }
    };
    update();
  };

  const rowUpdateHandler = (newData: any, oldData: any) => {
    const departmentCode = getDepartmentCodeByName(
      departments,
      newData.departmentName,
    );
    newData.departmentCode = departmentCode;

    const roleCode = getRoleCodeByName(roles, newData.roleName);
    newData.roleCode = roleCode;

    console.log('new Data is ' + newData);

    let data = blankRequestUser;
    data.companyId = newData.companyId as number;
    data.userId = newData.userId as number;
    data.userName = newData.userName as string;
    data.email = newData.email as string;
    data.paidHolidays = newData.paidHolidays as number;
    data.isActive = newData.isActive as string;
    if (newData.password === undefined || newData.password == null) {
      data.password = null;
    } else {
      data.password = newData.password as string;
    }

    data.departmentCode = departmentCode;
    data.departmentName = newData.departmentName as string;
    data.roleCode = roleCode;
    let users: RequestUser[] = new Array();
    users.push(data);

    console.log('req user is ' + data);

    const update = async () => {
      const result = (await userPageUseCase().writeUser(
        user.token,
        user.companyId,
        users,
      )) as PostOrDeleteResponse;

      console.log(result);

      if (result.ok) {
        alert('更新完了');
      } else {
        alert('失敗');
      }
    };
    update();
  };

  const rowDeleteHandler = (oldData: any) => {
    const data = blankUser;
    data.companyId = oldData.companyId;
    data.departmentCode = oldData.departmentCode;
    data.userId = oldData.userId;

    const eliminate = async () => {
      const result = (await userPageUseCase().eliminateUser(
        data.companyId,
        data.departmentCode,
        data.userId,
        user.token,
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
    <div>
      <UserDataTable
        users={users}
        roles={roles}
        departments={departments}
        rowAddHandler={rowAddHandler}
        rowUpdateHandler={rowUpdateHandler}
        rowDeleteHandler={rowDeleteHandler}
      />
    </div>
  );
};

export default UserDataTableContainer;
