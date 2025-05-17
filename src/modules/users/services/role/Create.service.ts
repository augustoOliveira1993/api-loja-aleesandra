import { injectable, inject } from 'tsyringe';
import { IRoleDTO, IRoleDocument } from '../../dto/IRoleDTO';
import IRoleRepository from '../../repositories/IRoleRepository';
import { AppError, BadRequestError } from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';

@injectable()
class CreateService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(data: IRoleDTO) {
    const roleNameExist = await this.repository.findByName(data.name);
    if (roleNameExist) {
      throw new BadRequestError('O nome da role já existe');
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'Role criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
