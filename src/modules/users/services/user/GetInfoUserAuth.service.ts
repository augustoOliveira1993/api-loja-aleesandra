import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { IPermissaoDTO } from '@modules/users/dto/IPermissaoDTO';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  private isUserAdmin(user: any) {
    return (
      user.roles.filter((role: any) => role.name === 'Administrador').length > 0
    );
  }

  public async execute(id: string) {
    const userExist = await this.usersRepository.findById(id);
    if (!userExist) {
      throw new BadRequestError('Usuário não encontrado!');
    }

    let ability: string[] = [];

    if (userExist.permissaos) {
      for (const p of userExist?.permissaos as unknown as IPermissaoDTO[]) {
        ability.push(p.name as string);
      }
    }

    let estruturaRm: string | undefined = '';

    return {
      _id: userExist._id,
      email: userExist.email,
      username: userExist.username,
      setor: userExist.setor,
      pagina_inicial: userExist.pagina_inicial,
      status: userExist.status,
      isAdmin: this.isUserAdmin(userExist) ?? false,
      ability,
    };
  }
}
