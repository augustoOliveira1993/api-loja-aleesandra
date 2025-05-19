import { injectable, inject } from 'tsyringe';
import { IDataBodyRemoverRoles } from '../../dto/IUsuarioDTO';
import { BadRequestError } from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class RemoveRolesByUserIdService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute(id: string, dataBody: IDataBodyRemoverRoles) {
    const { roles } = dataBody;
    const userUpdated = await this.repository.removerRolesByUserId(id, roles);
    if (!userUpdated) {
      throw new BadRequestError('Usuário não encontrada');
    }
    return {
      success: true,
      message: `${roles.length} foram removidas com successo!`,
      data: userUpdated,
    };
  }
}
