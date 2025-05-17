import { Request, Response, NextFunction } from 'express';
import { User } from '@modules/users/infra/mongo/models/User';

interface IReqBody {
  form: {
    username: string;
    email: string;
  };
  roles?: string[];
}

const ROLES = ['user', 'admin', 'moderator'];

export const checkDuplicateUsernameOrEmail = async (req: Request<{}, {}, IReqBody>, res: Response, next: NextFunction) => {
  try {
    const userByUsername = await User.findOne({ username: req.body.form.username }).exec();
    if (userByUsername) {
      res.status(409).send({ message: "Failed! Username is already in use!" });
      return;
    }

    const userByEmail = await User.findOne({ email: req.body.form.email }).exec();
    if (userByEmail) {
      res.status(409).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const checkRolesExisted = (req: Request<{}, {}, IReqBody>, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

export default verifySignUp;