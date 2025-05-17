import { injectable, inject } from 'tsyringe';
import IRoleRepository from '../../repositories/IRoleRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { isValidObjectIdMongose } from '@utils/healpers';

@injectable()
class CreateService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError('Role não encontrada');
    }
    return roleExist;
  }
}

export default CreateService;
