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
  token: string | null;
  posts: string | null;
};

export const blankUser = {
  id: '',
  name: '',
  email: '',
  password: '',
  status: '',
  paid_holidays: '',
  rest_paid_holidays: '',
  created_at: '',
  updated_at: '',
  token: '',
  posts: null,
};
