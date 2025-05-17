import { injectable, inject } from 'tsyringe';
import IPermissaoGrupoRepository from '../../repositories/IPermissaoGrupoRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { isValidObjectIdMongose } from '@utils/healpers';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError('PermissaoGrupo não encontrada');
    }
    return roleExist;
  }
}

export default CreateService;
