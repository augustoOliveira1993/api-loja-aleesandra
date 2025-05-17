import { Router } from 'express';
import RoleController from '@modules/users/infra/https/controllers/Role.controller';
import middleware from '@modules/users/infra/https/middleware';
import { cacheMiddleware } from '@middleware/cacheMiddleware';

const rolesRouter = Router();
const controller = new RoleController();

rolesRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

rolesRouter.post('/', [middleware.authJwt.verifyToken], controller.create);

rolesRouter.get('/', [middleware.authJwt.verifyToken], controller.findAll);

rolesRouter.get(
  '/:idRole',
  [middleware.authJwt.verifyToken],
  controller.findById,
);

rolesRouter.put(
  '/:idRole',
  [middleware.authJwt.verifyToken],
  controller.update,
);

rolesRouter.delete(
  '/:idRole',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

rolesRouter.post(
  '/:idRole/permissions',
  controller.addPermissionByRoleId,
);

export default rolesRouter;
