import { injectable, inject } from 'tsyringe';
import ILogRepository from '../../repositories/ILogRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
class CreateService {
  constructor(
    @inject('LogRepository')
    private repository: ILogRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError('Log não encontrada');
    }
    return roleExist;
  }
}

export default CreateService;
