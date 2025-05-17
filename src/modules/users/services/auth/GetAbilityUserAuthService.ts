import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { IPermissaoDTO } from '@modules/users/dto/IPermissaoDTO';

@injectable()
export default class GetAbilityUserAuthService {
  constructor(
    @inject('UsersRepository')
    private repositoryUser: IUsersRepository,
  ) {}

  private isUserAdmin(user: any) {
    return (
      user.roles.filter((role: any) => role.name === 'Administrador').length > 0
    );
  }

  public async execute(id: string) {
    const userExist = await this.repositoryUser.findById(id);
    if (!userExist) {
      throw new BadRequestError('Usuário não encontrado!');
    }

    let ability: string[] = [];

    if (userExist.permissaos) {
      for (const p of userExist?.permissaos as unknown as IPermissaoDTO[]) {
        ability.push(p.name as string);
      }
    }

    return {
      _id: userExist._id,
      isAdmin: this.isUserAdmin(userExist) ?? false,
      ability,
    };
  }
}
