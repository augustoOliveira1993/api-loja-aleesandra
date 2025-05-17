import { injectable, inject } from 'tsyringe';
import { IAddRoleDataBody, IDataBodyAddPermissions } from '../../dto/IUserDTO';
import mongoose from 'mongoose';
import { BadRequestError } from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import { logger } from '@shared/utils/logger';
import { IRoleDocument, IRoleDTO } from '@modules/users/dto/IRoleDTO';

@injectable()
export default class AddRoleByUserIdService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository,
    @inject('RoleRepository') private roleRepository: IRoleRepository,
  ) {}

  public async execute(idUser: string, dataBody: IAddRoleDataBody) {
    const { idsRoles } = dataBody;

    const useExist = await this.repository.findById(idUser);
    if (!useExist) {
      throw new BadRequestError('Usuário não encontrado!');
    }

    let roleObjectIds = [];
    let countRoleNotFound = 0;

    for (const idRole of idsRoles) {
      const roleExist: IRoleDocument | Boolean = await this.roleRepository
        .findById(idRole)
        .then(res => res as IRoleDocument)
        .catch(err => err.name !== 'CastError');
      if (roleExist) {
        if (roleExist) {
          roleObjectIds.push(
            (roleExist as IRoleDocument)._id as mongoose.Types.ObjectId,
          );
        } else {
          countRoleNotFound++;
        }
      } else {
        countRoleNotFound++;
      }
    }

    useExist.roles = roleObjectIds as unknown as string[];
    await useExist.save();
    logger.info(`${countRoleNotFound} não foram encontradas...`);
    return {
      success: true,
      data: useExist,
    };
  }
}
