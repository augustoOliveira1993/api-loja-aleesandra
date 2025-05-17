import { injectable, inject } from 'tsyringe';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { isValidObjectIdMongose } from '@utils/healpers';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError('Permissao não encontrada');
    }
    return roleExist;
  }
}

export default CreateService;
