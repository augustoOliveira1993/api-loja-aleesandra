import { injectable, inject } from 'tsyringe';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { isValidObjectIdMongose } from '@utils/healpers';

@injectable()
class CreateService {
  constructor(
    @inject('CategoryRepository')
    private repository: ICategoryRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError('Category não encontrada');
    }
    return roleExist;
  }
}

export default CreateService;
