import { injectable, inject } from 'tsyringe';
import { IUserDTO, IUserDocument } from '../../dto/IUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';

interface IRequest {
  _id: string;
  username: string;
  status: string;
  email: string;
  avatar_url: string;
  pagina_inicial: string;
  setor: string;
  roles: string;
  permissions: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async editUser(
    id: string,
    userData: IUserDTO,
  ): Promise<IUserDocument | null> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const updatedUser = await this.usersRepository.updateUser(id, userData);
    return updatedUser;
  }
}

export default UpdateUserService;
