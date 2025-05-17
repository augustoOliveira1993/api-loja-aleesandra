import { injectable, inject } from 'tsyringe';
import { IDataBodyAddPermissions } from '../../dto/IUserDTO';
import IRoleRepository from '../../repositories/IRoleRepository';
import { BadRequestError } from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class RemovePermissionByUserIdService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute(id: string, dataBody: IDataBodyAddPermissions) {
    const { permissaos } = dataBody;
    const userUpdated = await this.repository.removePermissionByUserId(
      id,
      permissaos,
    );
    if (!userUpdated) {
      throw new BadRequestError('Usuário não encontrada');
    }
    return {
      success: true,
      message: 'Permissão removida com sucesso',
      data: userUpdated,
    };
  }
}
