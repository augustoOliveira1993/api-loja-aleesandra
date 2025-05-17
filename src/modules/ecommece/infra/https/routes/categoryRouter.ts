import { Router } from 'express';
import middleware from '@modules/users/infra/https/middleware';
import CategoryController from '../controllers/CategoryController';

const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

categoryRouter.post(
  '/',
  [middleware.authJwt.verifyToken],
  controller.create,
);

categoryRouter.get(
  '/',
  [middleware.authJwt.verifyToken],
  controller.findAll,
);

categoryRouter.get(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.findById,
);

categoryRouter.put(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.update,
);

categoryRouter.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

export default categoryRouter;
