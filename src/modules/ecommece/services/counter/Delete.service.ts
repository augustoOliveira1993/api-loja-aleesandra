import { injectable, inject } from 'tsyringe';
import ICounterRepository from '../../repositories/ICounterRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
class DeleteCounterService {
  constructor(
    @inject('CounterRepository')
    private repository: ICounterRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new BadRequestError('Counter não encontrada');
    }
    return {
      success: true,
      message: 'Counter deletada com sucesso!',
      data: {
        id: roleDeleted.id,
        name: roleDeleted.name,
      },
    };
  }
}

export default DeleteCounterService;
