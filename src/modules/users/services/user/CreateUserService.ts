import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { IUserDTO } from '../../dto/IUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { logger } from '@shared/utils/logger';
import authConfig from '@config/auth.config';
@injectable()
export default class CreateService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute(data: IUserDTO) {
    const emailExist = await this.repository.findByEmail(data.email);
    if (emailExist) {
      throw new BadRequestError('O email já existe');
    }

    if (!data.password) {
      logger.info(`Senha não informada para o usuário ${data.email}`);
      data.password = authConfig.password_default!;
    }

    const hashedPassword = bcrypt.hashSync(data.password, 8);

    const created = await this.repository.createUser({
      ...data,
      password: hashedPassword,
    });
    return {
      success: true,
      message: 'Users criada com sucesso!',
      data: created,
    };
  }
}
