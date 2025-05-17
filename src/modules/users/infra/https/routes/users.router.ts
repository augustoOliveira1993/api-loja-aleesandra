import { Router } from 'express';
import UsersController from '@modules/users/infra/https/controllers/UsersController';
import middleware from '@modules/users/infra/https/middleware';

const router = Router();
const controller = new UsersController();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.post('/', controller.create);

router.get(
  '/test/user',
  [middleware.authJwt.verifyToken],
  controller.getUserAuth,
);

router.get('/', [middleware.authJwt.verifyToken], controller.findAll);

router.get('/:id', [middleware.authJwt.verifyToken], controller.findById);

router.put(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.updateUser,
);

router.delete(
  '/:id',
  [middleware.authJwt.verifyToken],
  controller.delete,
);

router.post(
  '/:id/roles',
  [middleware.authJwt.verifyToken],
  controller.addRolesByUserId,
);

router.delete(
  '/:id/roles',
  [middleware.authJwt.verifyToken],
  controller.removerRolesByUserId,
);

router.put('/edit', [middleware.authJwt.verifyToken], controller.update);

router.post(
  '/:id/permissions',
  [middleware.authJwt.verifyToken],
  controller.addPermissionByUserId,
);

router.delete(
  '/:id/permissions',
  [middleware.authJwt.verifyToken],
  controller.removePermissionByUserId,
);

export default router;
