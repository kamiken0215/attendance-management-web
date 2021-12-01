import { InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';
import { DepartmentContext } from '../../../../contexts/DepartmentContext';
import { MainPageContext } from '../../../../contexts/MainPageContext';
import { SearchUserParams } from '../../../../entities/RequestUsers';
import { Departments } from '../../../../entities/Departments';
import UserSearchForm from '../../../components/Home/User/UserSearchForm';

type Props = {
  departments: Departments[];
  handleOnSearch: (departmentCode: string) => void;
};

const UserSearchFormContainer: FC<Props> = ({
  departments,
  handleOnSearch,
}) => {
  const [departmentCode, setDepartmentCode] = useState('');

  console.log(departments);

  const handleChange = (event) => {
    console.log(event.target.value);
    setDepartmentCode(event.target.value);
  };

  if (!departments) {
    return <div></div>;
  } else {
    return (
      <UserSearchForm
        departmentCode={departmentCode}
        handleChange={handleChange}
        itemList={departments}
        handleOnSearch={handleOnSearch}
      />
    );
  }
};

export default UserSearchFormContainer;
