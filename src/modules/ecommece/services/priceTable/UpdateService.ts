import { injectable, inject } from 'tsyringe';
import IPriceTableRepository from '../../repositories/IPriceTableRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { IPriceTableDTO } from '@modules/ecommece/dto/IPriceTableDTO';

@injectable()
export default class UpdateService {
  constructor(
    @inject('PriceTableRepository')
    private repository: IPriceTableRepository,
  ) {}

  public async execute(idPriceTable: string, data: IPriceTableDTO) {
    const roleExist = await this.repository.findById(idPriceTable);
    if (!roleExist) {
      throw new BadRequestError('PriceTable não encontrada');
    }
    const updatePriceTable = await this.repository.update(idPriceTable, data);
    return {
      success: true,
      message: `PriceTable atualizada com sucesso!`,
      data: updatePriceTable,
    };
  }
}
