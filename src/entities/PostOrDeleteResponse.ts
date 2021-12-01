export type PostOrDeleteResponse = {
  number: number;
  ok: boolean;
  message: string;
};

export const defaultPostOrDeleteResponse: PostOrDeleteResponse = {
  number: 0,
  ok: false,
  message: 'エラー',
};
