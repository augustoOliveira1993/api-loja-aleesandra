import { injectable, inject } from 'tsyringe';
import IPriceTableRepository from '../../repositories/IPriceTableRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
class DeletePriceTableService {
  constructor(
    @inject('PriceTableRepository')
    private repository: IPriceTableRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new BadRequestError('PriceTable não encontrada');
    }
    return {
      success: true,
      message: 'PriceTable deletada com sucesso!',
      data: {
        id: roleDeleted.id,
        name: roleDeleted.name,
      },
    };
  }
}

export default DeletePriceTableService;
