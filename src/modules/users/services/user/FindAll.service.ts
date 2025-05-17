import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { IResquestQuery, IUserDTO } from '@modules/users/dto/IUserDTO';
import { QueryOptions } from 'mongoose';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';

@injectable()
export default class FindAllService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute(query: QueryOptions<IUserDTO>) {
    let queryParams = {};

    if (query.search) {
      queryParams = {
        ...queryParams,
        $or: [
          { username: { $regex: new RegExp(query.search, 'i') } },
          { email: { $regex: new RegExp(query.search, 'i') } },
        ],
      };
    }

    if (query.searchRoles) {
      const regexRoles = new RegExp(query.searchRoles, 'i');
      const rolesExist = await this.roleRepository.findAll({
        name: { $regex: regexRoles },
      });
      queryParams = {
        ...queryParams,
        roles: {
          $in: rolesExist?.map(role => role._id),
        },
      };
    }
    return {
      total: await this.usersRepository.count(queryParams),
      data: await this.usersRepository.findAll(queryParams),
    };
  }
}
