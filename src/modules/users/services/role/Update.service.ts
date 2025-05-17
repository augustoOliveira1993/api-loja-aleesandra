import { injectable, inject } from 'tsyringe';
import { IRoleDTO } from '../../dto/IRoleDTO';
import IRoleRepository from '../../repositories/IRoleRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
export default class UpdateService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(idRole: string, data: IRoleDTO) {
    const roleExist = await this.repository.findById(idRole);
    if (!roleExist) {
      throw new BadRequestError('Role não encontrada');
    }
    const updateRole = await this.repository.update(idRole, data);
    return {
      success: true,
      message: `Role atualizada com sucesso!`,
      data: updateRole,
    };
  }
}
