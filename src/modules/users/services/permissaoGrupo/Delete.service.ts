import { injectable, inject } from 'tsyringe';
import IPermissaoGrupoRepository from '../../repositories/IPermissaoGrupoRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
class DeletePermissaoGrupoService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new BadRequestError('PermissaoGrupo não encontrada');
    }
    return {
      success: true,
      message: 'PermissaoGrupo deletada com sucesso!',
      data: {
        id: roleDeleted.id,
        name: roleDeleted.name,
      },
    };
  }
}

export default DeletePermissaoGrupoService;
