import { Router } from 'express';
import LogController from '@modules/log/infra/https/controllers/Log.controller';
import middleware from '@modules/users/infra/https/middleware';

const routers = Router();
const controller = new LogController();

routers.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

routers.post('/', [middleware.authJwt.verifyToken], controller.create);

routers.get('/', [middleware.authJwt.verifyToken], controller.findAll);

routers.get('/last-registro' , [middleware.authJwt.verifyToken], controller.getLastRegistroByCategory);

routers.get('/:id', [middleware.authJwt.verifyToken], controller.findById);

routers.put('/:id', [middleware.authJwt.verifyToken], controller.update);

routers.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

export default routers;
