import { Router } from 'express';
import middleware from '@modules/users/infra/https/middleware';
import PriceTableController from '../controllers/PriceTableController';

const priceTableRouter = Router();
const controller = new PriceTableController();

priceTableRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

priceTableRouter.post(
  '/',
  [middleware.authJwt.verifyToken],
  controller.create,
);

priceTableRouter.get(
  '/',
  [middleware.authJwt.verifyToken],
  controller.findAll,
);

priceTableRouter.get(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.findById,
);

priceTableRouter.put(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.update,
);

priceTableRouter.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

export default priceTableRouter;
