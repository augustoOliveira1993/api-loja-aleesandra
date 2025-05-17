import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import middleware from '@modules/users/infra/https/middleware';

const productRouter = Router();
const controller = new ProductController();

productRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

productRouter.post(
  '/',
  [middleware.authJwt.verifyToken],
  controller.create,
);

productRouter.get(
  '/',
  [middleware.authJwt.verifyToken],
  controller.findAll,
);

productRouter.get(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.findById,
);

productRouter.put(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.update,
);

productRouter.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

export default productRouter;
