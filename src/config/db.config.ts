import dotenv from 'dotenv';

dotenv.config();

interface Config {
  HOST: string | undefined;
  PORT: string | undefined;
  DB: string | undefined;
}

const config: Config = {
  HOST: process.env.HOST,
  PORT: process.env.PORTMONGO,
  DB: process.env.DB
};

export default config;
