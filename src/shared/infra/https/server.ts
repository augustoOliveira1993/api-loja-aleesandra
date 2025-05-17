import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppServer } from './app';
import { logger } from '@shared/utils/logger';
dotenv.config();


const app = new AppServer().server;
const portServer = process.env.PORT;

app.listen(portServer, () => {
  logger.info(
    `🚀 Crons Services started on ${process.env.APP_WEB_URL}:${portServer}`,
  );
});
