import React, { FC, useContext, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { Users } from '../../../../entities/Users';
import { SearchUserParams } from '../../../../entities/RequestUsers';
import { userPageUseCase } from '../../../../usecase/userPageUseCase';
import EnhancedUserDataTableContainer from './EnhancedUserDataTableContainer';
import UserSearchFormContainer from './UserSearchFormContainer';
import { DepartmentContext } from '../../../../contexts/DepartmentContext';
import { MainPageContext } from '../../../../contexts/MainPageContext';

const UserContainer: FC = () => {
  console.count(UserContainer.name);
  const user = useContext(UserContext);
  const [users, setUsers] = useState<Users[]>([]);
  const { departments } = useContext(MainPageContext);
  //const departments = useContext(DepartmentContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSearch = (departmentCode: string) => {
    if (departmentCode.length == 0) {
      departmentCode = null;
    }
    setIsLoading(true);
    const search = async () => {
      const result = (await userPageUseCase().fetchUsers(
        user.user.companyId,
        departmentCode,
        null,
        user.user.token,
      )) as Users[];

      console.log(result);
      setUsers(result);
    };
    search();
    setIsLoading(false);
  };

  return (
    <div>
      <UserSearchFormContainer
        departments={departments}
        handleOnSearch={handleOnSearch}
      />
      <EnhancedUserDataTableContainer data={users} loading={isLoading} />
    </div>
  );
};

export default UserContainer;
