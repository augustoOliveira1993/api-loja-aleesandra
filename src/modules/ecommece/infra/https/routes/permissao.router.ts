import { Router } from 'express';
import PermissaoController from '@modules/users/infra/https/controllers/Permissao.controller';
import middleware from '../middleware';
import { cacheMiddleware } from '@middleware/cacheMiddleware';

const permissoesRouter = Router();
const controller = new PermissaoController();

permissoesRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

permissoesRouter.post(
  '/',
  [middleware.authJwt.verifyToken],
  controller.create,
);

permissoesRouter.get(
  '/',
  [middleware.authJwt.verifyToken],
  controller.findAll,
);

permissoesRouter.get(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.findById,
);

permissoesRouter.put(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.update,
);

permissoesRouter.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

export default permissoesRouter;
