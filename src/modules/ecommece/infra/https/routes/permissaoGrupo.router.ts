import { Router } from 'express';
import PermissaoGrupoController from '@modules/users/infra/https/controllers/PermissaoGrupo.controller';
import middleware from '../middleware';

const permissaoGruposRouter = Router();
const controller = new PermissaoGrupoController();

permissaoGruposRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

permissaoGruposRouter.post(
  '/',
  [middleware.authJwt.verifyToken],
  controller.create,
);

permissaoGruposRouter.get(
  '/',
  [middleware.authJwt.verifyToken],
  controller.findAll,
);

permissaoGruposRouter.get(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.findById,
);

permissaoGruposRouter.put(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.update,
);

permissaoGruposRouter.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

export default permissaoGruposRouter;
