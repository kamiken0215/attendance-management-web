export type Roles = {
  roleCode: string;
  roleName: string;
  explanation: string;
};

export const getRoleCodeByName = (roles: Roles[], roleName: string) => {
  console.log('対象権限名' + roleName);
  for (const c of roles) {
    if (c.roleName.match(roleName)) {
      return c.roleCode;
    }
  }
};
