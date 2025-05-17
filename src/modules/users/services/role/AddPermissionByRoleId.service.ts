import { injectable, inject } from 'tsyringe';
import { IDataBodyAddPermissions } from '../../dto/IRoleDTO';
import IRoleRepository from '../../repositories/IRoleRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
export default class AddPermissionsByRoleIdService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(id: string, dataBody: IDataBodyAddPermissions) {
    const { permissions } = dataBody;
    const roleUpdated = await this.repository.addPermissionByRoleId(
      id,
      permissions,
    );
    if (!roleUpdated) {
      throw new BadRequestError('Role não encontrada');
    }
    return {
      success: true,
      message: 'Permissões adicionada com sucesso',
      data: roleUpdated,
    };
  }
}
