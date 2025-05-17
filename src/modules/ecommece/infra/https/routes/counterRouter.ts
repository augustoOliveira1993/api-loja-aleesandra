import { Router } from 'express';
import middleware from '@modules/users/infra/https/middleware';
import CounterController from '../controllers/CounterController';

const counterRouter = Router();
const controller = new CounterController();

counterRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

counterRouter.post(
  '/',
  [middleware.authJwt.verifyToken],
  controller.create,
);

counterRouter.get(
  '/',
  [middleware.authJwt.verifyToken],
  controller.findAll,
);

counterRouter.get(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.findById,
);

counterRouter.put(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.update,
);

counterRouter.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

export default counterRouter;
