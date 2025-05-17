import { injectable, inject } from 'tsyringe';
import ILogRepository from '../../repositories/ILogRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
class DeleteLogService {
  constructor(
    @inject('LogRepository')
    private repository: ILogRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new BadRequestError('Log não encontrada');
    }
    return {
      success: true,
      message: 'Log deletada com sucesso!',
      data: {
        id: roleDeleted.id,
        name: roleDeleted.action,
      },
    };
  }
}

export default DeleteLogService;
