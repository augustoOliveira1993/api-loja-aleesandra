import 'reflect-metadata';
import '@shared/container';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { logger, addLogRotate } from '@shared/utils/logger';
import routes from '@shared/infra/https/routes';
import { connectDB } from '@config/db.config2';
import { AppError } from '@shared/errors/AppError';
import { MongoErros, typeErrorsMongo } from '@shared/errors/MongoErrors';
import uploadConfig from '@config/upload';
import cron from 'node-cron';

export class AppServer {
  public server: express.Application;

  constructor() {
    addLogRotate('./logs');
    this.server = express();
    connectDB();
    this.middlewares();
    this.routes();
    if (process.env.NODE_ENV === 'production') {
      this.initCrons();
    }
    this.errorMiddleware();
  }

  private middlewares() {
    this.server.use(express.json());
    // this.server.use(invalidateCacheDynamicMiddleware)
    // this.server.use(updateCacheMiddleware);
    this.server.use('/files', express.static(uploadConfig.directory));
    this.server.use(
      cors({
        origin: process.env.CORS,
      }),
    );
  }

  private async initCrons() {
    cron.schedule('* * * * *', async () => {});
  }

  private routes() {
    this.server.use('/api', routes);

    this.server.get('/', (_: Request, res: Response) => {
      res.json({
        succes: true,
        message: 'Welcome to SIG@VB Crons Serviçes.',
        status: 'Online e funcionando.',
      });
    });
  }

  private errorMiddleware() {
    this.server.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        console.log('errorMiddleware', error);
        let ipRequest =
          request.ip?.split(':').length === 3
            ? 'local'
            : request.ip?.split(':')[3];

        let infoMessage = `> ${request.url} [${ipRequest} - ${!request?.userEmail ? request?.body.email : 'anônimo'}]`;
        if (typeErrorsMongo.includes(error.name)) {
          const mongoError = new MongoErros(error);
          const errorResponse = mongoError.getMessage();
          return response.status(errorResponse.status).json(errorResponse);
        }
        if (error instanceof AppError) {
          logger.error(
            `${infoMessage}: ${error.message} - Status: ${error.statusCode}`,
          );
          return response.status(error.statusCode).json(error.getMessage());
        }

        logger.error(`${infoMessage}: ${error.message} - Status: ${500}`);
        return response.status(500).json({
          success: false,
          title: 'Ocorreu um erro interno!',
          message: 'Erro interno no servidor.',
          error: error.message,
          origin: error.stack?.split('\n').map(err => err.trim()),
          type_error: error.name,
        });
      },
    );
  }
}
