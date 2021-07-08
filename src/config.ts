import { env } from 'node:process';

const config = {
  api: process.env.REACT_APP_DEV_API_URL,
};

export default config;
