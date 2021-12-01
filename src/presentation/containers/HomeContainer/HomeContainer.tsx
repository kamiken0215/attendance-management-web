import React, { FC, useContext, useEffect, useState } from 'react';
import AttendanceContainer from './AttendanceContainer/AttendanceContainer';
import UserSettingContainer from './SettingContainer/UserSettingContainer';
import HomeComponent from '../../components/Home/HomeComponent';
import { UserContext } from '../../../contexts/UserContext';
import { MainPageContext } from '../../../contexts/MainPageContext';
import { AttendanceClasses } from '../../../entities/AttendanceClasses';
import { AttendanceStatus } from '../../../entities/AttendanceStatus';
import { Departments } from '../../../entities/Departments';
import { Companies, blankCompany } from '../../../entities/Companies';
import { AttendanceClassResponse } from '../../../entities/AttendanceClassResponse';
import { AttendanceStatusResponse } from '../../../entities/AttendanceStatusResponse';
import { RoleResponse } from '../../../entities/RoleResponse';
import { CompanyResponse } from '../../../entities/CompanyResponse';
import { DepartmentResponse } from '../../../entities/DepartmentsResponse';
import { homePageUsecase } from '../../../usecase/homePageUseCase';
import UserContainer from '../HomeContainer/UserContainer/UserContainer';
import { Roles } from '../../../entities/Roles';
import AdminContaniner from './SettingContainer/AdminSettingContainer';

export type MenuType =
  | 'attendance'
  | 'userSetting'
  | 'user'
  | 'adminSetting'
  | 'attendanceSetting';

const HomeContainer: FC = () => {
  const { user } = useContext(UserContext);

  const [company, setCompany] = useState<Companies | null>(null);
  const [attendanceClasses, setAttendanceClasses] = useState<
    AttendanceClasses[] | null
  >(null);
  const [attendanceStatus, setAttendanceStatus] = useState<
    AttendanceStatus[] | null
  >(null);
  const [departments, setDepartments] = useState<Departments[] | null>(null);

  const [roles, setRoles] = useState<Roles[] | null>(null);

  const [menu, setMenu] = useState('attendance');

  const handleOnClickMenu = (value: string) => {
    console.log(value);
    setMenu(value);
  };

  const [onChangeToSettings, setOnChangeToSettings] = useState(true);

  useEffect(() => {
    const fetchCompanyAndDepartment = async () => {
      const theComapnyAndDepartments = (await homePageUsecase().fetchCompanyAndDepartment(
        user.companyId,
        user.token,
      )) as CompanyResponse;

      if (theComapnyAndDepartments) {
        console.log('取得会社:' + theComapnyAndDepartments.companyName);

        console.log('取得部門:' + theComapnyAndDepartments.departments);
        const theCompany = blankCompany;
        theCompany.companyId = theComapnyAndDepartments.companyId;
        theCompany.companyName = theComapnyAndDepartments.companyName;
        theCompany.departments = theComapnyAndDepartments.departments;
        setCompany(theCompany);
        setDepartments(theComapnyAndDepartments.departments);
      }
    };

    const fetchRoles = async () => {
      const theRoles = (await homePageUsecase().fetchRoles(
        user.token,
      )) as RoleResponse;

      if (theRoles) {
        console.log('取得:' + theRoles.roles);
        setRoles(theRoles.roles);
      }
    };

    const fetchClasses = async () => {
      const theClasses = (await homePageUsecase().fetchAttendanceClasses(
        user.companyId,
        null,
        user.token,
      )) as AttendanceClassResponse;

      if (theClasses) {
        console.log('取得クラス' + theClasses.attendanceClasses);
        setAttendanceClasses(theClasses.attendanceClasses);
      }
    };

    const fetchStatus = async () => {
      const theStatus = (await homePageUsecase().fetchAttendanceStatus(
        user.token,
      )) as AttendanceStatusResponse;

      if (theStatus) {
        console.log('取得ステータス' + theStatus.attendanceStatuses);
        setAttendanceStatus(theStatus.attendanceStatuses);
      }
    };

    // const fetchDepartment = async () => {
    //   const theDepartments = (await homePageUsecase().fetchDepartment(
    //     user.companyId,
    //     null,
    //     user.token,
    //   )) as DepartmentResponse;

    //   if (theDepartments) {
    //     console.log('取得部門' + theDepartments.departments);
    //     setDepartments(theDepartments.departments);
    //   }
    // };

    fetchCompanyAndDepartment();
    fetchRoles();
    fetchClasses();
    fetchStatus();
    // fetchDepartment();
  }, []);

  // console.log(attendanceClasses);
  const handleChangeToSettings = () => {
    setOnChangeToSettings(true);
  };

  //  ここでコンテンツ

  if (!attendanceStatus || !attendanceClasses || !departments || !roles) {
    return <div></div>;
  } else {
    return (
      <MainPageContext.Provider
        value={{
          company,
          setCompany,
          roles,
          setRoles,
          departments,
          setDepartments,
          attendanceStatus,
          setAttendanceStatus,
          attendanceClasses,
          setAttendanceClasses,
        }}
      >
        <HomeComponent handleOnClickMenu={handleOnClickMenu}>
          {menu === 'attendance' ? (
            <AttendanceContainer />
          ) : menu === 'userSetting' ? (
            <UserSettingContainer />
          ) : menu === 'user' ? (
            <UserContainer />
          ) : menu === 'adminSetting' ? (
            <AdminContaniner />
          ) : (
            <div />
          )}
        </HomeComponent>
      </MainPageContext.Provider>
    );
  }
};

export default HomeContainer;
