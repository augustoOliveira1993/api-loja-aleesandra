import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
export default class DeleteServiceService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string) {
    const userExist = await this.usersRepository.delete(id);
    if (!userExist) {
      throw new BadRequestError('Usuário não encontrado!');
    }
    return {
      success: true,
      message: 'Usuário deletado com sucesso!',
      data: {
        _id: userExist?._id,
      },
    };
  }
}
