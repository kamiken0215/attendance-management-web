import React, { FC, SyntheticEvent, useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { Users } from '../../../../entities/Users';
import UserSettingViews from '../../../components/Home/Setting/UserSettingComponent';
import { userPageUseCase } from '../../../../usecase/userPageUseCase';
import { PostOrDeleteResponse } from '../../../../entities/PostOrDeleteResponse';

type FormInputs = {
  userName: string;
  email: string;
  password: string;
};

const UserSettingContainer: FC = () => {
  const { user, setUser } = useContext(UserContext);

  const editUser = (data: FormInputs) => {
    const theUser: Users = user;

    theUser.userName = data.userName;
    theUser.email = data.email;
    theUser.password = data.password;

    let userList: Users[] = new Array();
    userList.push(theUser);

    const update = async () => {
      const result = (await userPageUseCase().writeUser(
        user.token,
        user.companyId,
        userList,
      )) as PostOrDeleteResponse;

      console.log(result);

      if (result.ok) {
        alert('更新完了');
      } else {
        alert('失敗');
      }
    };
    update();

    setUser(theUser);
  };

  return <UserSettingViews user={user} editUser={editUser}></UserSettingViews>;
};

export default UserSettingContainer;
