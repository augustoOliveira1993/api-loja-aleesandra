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

router.post(
  '/signup',
  [middleware.verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup,
);

router.post('/signin', controller.signin);

router.post('/refresh', controller.refreshToken);

router.get(
  '/abilities',
  [middleware.authJwt.verifyToken],
  controller.getAbilityUserAuth,
);

export default router;
