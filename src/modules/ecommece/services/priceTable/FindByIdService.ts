import { injectable, inject } from 'tsyringe';
import IPriceTableRepository from '../../repositories/IPriceTableRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { isValidObjectIdMongose } from '@utils/healpers';

@injectable()
class CreateService {
  constructor(
    @inject('PriceTableRepository')
    private repository: IPriceTableRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError('PriceTable não encontrada');
    }
    return roleExist;
  }
}

export default CreateService;
