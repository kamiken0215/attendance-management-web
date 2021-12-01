import { Params } from './params';

export const uriBuilder = () => {
  const createAttendanceUri = (params: Params): string => {
    //  ip + port
    let uri: string = process.env.REACT_APP_DEV_API_URL as string;
    console.log('params is' + params.companyId);
    const companyId = params.companyId;
    const departmentCode = params.departmentCode;
    const userId = params.userId;
    const attendanceClassCode = params.attendanceClassCode;
    const attendanceDate = params.attendanceDate;

    if (
      companyId != null &&
      departmentCode != null &&
      userId != null &&
      attendanceDate != null
    ) {
      uri += `/companies/${companyId}/departments/${departmentCode}/users/${userId}/attendances/${attendanceDate}`;
    } else if (
      companyId != null &&
      departmentCode != null &&
      userId != null &&
      attendanceDate == null
    ) {
      uri += `/companies/${companyId}/departments/${departmentCode}/users/${userId}/attendances`;
    } else if (
      companyId != null &&
      departmentCode != null &&
      userId == null &&
      attendanceDate == null
    ) {
      uri += `/companies/${companyId}/departments/${departmentCode}/attendances`;
    } else if (
      companyId != null &&
      departmentCode == null &&
      userId == null &&
      attendanceDate == null
    ) {
      uri += `/companies/${companyId}/attendances`;
    } else {
      uri = '';
    }

    return uri;
  };

  const createAttendanceClassUri = (params: Params): string => {
    //  ip + port
    let uri: string = process.env.REACT_APP_DEV_API_URL as string;
    console.log('params is' + params.companyId);
    const companyId = params.companyId;
    const attendanceClassCode = params.attendanceClassCode;

    if (companyId != null && attendanceClassCode == null) {
      uri += `/companies/${companyId}/classes`;
    } else if (companyId != null && attendanceClassCode != null) {
      uri += `/companies/${companyId}/classes/${attendanceClassCode}`;
    } else {
      uri = '';
    }

    return uri;
  };

  const createDepartmentUri = (params: Params): string => {
    //  ip + port
    let uri: string = process.env.REACT_APP_DEV_API_URL as string;
    console.log('params is' + params.companyId);
    const companyId = params.companyId;
    const departmentCode = params.departmentCode;

    if (companyId != null && departmentCode != null) {
      uri += `/companies/${companyId}/departments/${departmentCode}`;
    } else if (companyId != null && departmentCode == null) {
      uri += `/companies/${companyId}/departments`;
    } else {
      uri = '';
    }

    return uri;
  };

  const createUserUri = (params: Params): string => {
    //  ip + port
    let uri: string = process.env.REACT_APP_DEV_API_URL as string;
    console.log('params is' + params.companyId);
    const companyId = params.companyId;
    const departmentCode = params.departmentCode;
    const userId = params.userId;

    if (companyId != null && departmentCode != null && userId != null) {
      uri += `/companies/${companyId}/departments/${departmentCode}/users/${userId}`;
    } else if (companyId != null && departmentCode != null && userId == null) {
      uri += `/companies/${companyId}/departments/${departmentCode}/users`;
    } else if (companyId != null && departmentCode == null && userId == null) {
      uri += `/companies/${companyId}/users`;
    } else {
      uri = '';
    }

    return uri;
  };

  return {
    createAttendanceUri,
    createAttendanceClassUri,
    createDepartmentUri,
    createUserUri,
  };
};
