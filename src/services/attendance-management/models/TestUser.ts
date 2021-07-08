export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  paid_holidays: string;
  rest_paid_holidays: string;
  created_at: string;
  updated_at: string;
  token: string;
  posts: string;
};

export const TestUser = {
  id: '999',
  name: 'TEST',
  email: 'TEST@gmail.com',
  password: 'TEST',
  status: '1',
  token: 'TEST',
};
