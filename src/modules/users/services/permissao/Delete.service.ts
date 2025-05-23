import { injectable, inject } from 'tsyringe';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
class DeletePermissaoService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new BadRequestError('Permissao não encontrada');
    }
    return {
      success: true,
      message: 'Permissao deletada com sucesso!',
      data: {
        id: roleDeleted.id,
        name: roleDeleted.name,
      },
    };
  }
}

export default DeletePermissaoService;
