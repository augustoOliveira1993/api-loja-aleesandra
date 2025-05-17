import { injectable, inject } from 'tsyringe';
import ICounterRepository from '../../repositories/ICounterRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { isValidObjectIdMongose } from '@utils/healpers';

@injectable()
class CreateService {
  constructor(
    @inject('CounterRepository')
    private repository: ICounterRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError('Counter não encontrada');
    }
    return roleExist;
  }
}

export default CreateService;
