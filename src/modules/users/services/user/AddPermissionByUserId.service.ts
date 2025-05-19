import { injectable, inject } from 'tsyringe';
import { IDataBodyAddPermissions } from '../../dto/IUsuarioDTO';
import IRoleRepository from '../../repositories/IRoleRepository';
import { BadRequestError } from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class AddPermissionsByUserIdService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute(id: string, dataBody: IDataBodyAddPermissions) {
    const { permissaos } = dataBody;
    const roleUpdated = await this.repository.addPermissionByUserId(
      id,
      permissaos,
    );
    if (!roleUpdated) {
      throw new BadRequestError('Usuário não encontrada');
    }
    return {
      success: true,
      message: 'Permissões adicionada com sucesso',
      data: roleUpdated,
    };
  }
}
