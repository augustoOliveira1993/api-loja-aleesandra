import { Request, Response, NextFunction } from 'express';
import config from '@config/auth.config';
import jwt from 'jsonwebtoken';
import { Usuario} from '@modules/users/infra/mongo/models/Usuario';
import { Role } from '@modules/users/infra/mongo/models/Role';
import { IRoleDocument } from '@modules/users/dto/IRoleDTO';

import { AppError } from '@shared/errors/AppError';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let token = req.headers['x-access-token'] as string;

  if (!token) {
    res.status(401).send({ message: 'No token provided!' });
    return;
  }

  if (!config.secret) {
    throw new AppError('Secret key is not defined');
  }

  jwt.verify(token, config.secret, (err, decoded: any) => {
    if (err) {
      res.status(401).send({ message: 'Unauthorized!' });
      return;
    }
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.is_admin = decoded.is_admin
    req.estrutura_rm = decoded.estrutura_rm
    next();
  });
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  Usuario.findById(req.userId, (err: any, user: { roles: any }) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user?.roles },
      },
      (err: any, roles: IRoleDocument[]) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'Administrador') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Require Admin Role!' });
      },
    );
  });
};

export const isModerator = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  Usuario.findById(req.userId, (err: any, user: { roles: any }) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user?.roles },
      },
      (err: any, roles: IRoleDocument[]) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'moderator') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Require Moderator Role!' });
      },
    );
  });
};

export const generateToken = (payload: any, noExpiration: boolean = false): string => {
  if (!config.secret) {
    throw new AppError('Secret key is not defined');
  }
  const options: jwt.SignOptions = noExpiration ? {} : { expiresIn: payload.expire_at };

  return jwt.sign(payload, config.secret, options);
};

export const generateRefreshToken = (payload: any, noExpiration: boolean = false): string => {
  if (!config.refreshSecret) {
    throw new AppError('Refresh secret key is not defined');
  }

  const options: jwt.SignOptions = noExpiration
  ? {}
  : { expiresIn: payload?.expire_at ? `${Number(payload?.expire_at?.slice(0, -1)) + 1}${payload?.expire_at?.slice(-1)}` : config.expiresInRefreshToken };

  return jwt.sign(payload, config.refreshSecret, options);
};


const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  generateToken,
  generateRefreshToken,
};

export default authJwt;
