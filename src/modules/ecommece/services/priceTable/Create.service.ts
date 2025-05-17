import { injectable, inject } from 'tsyringe';
import IPriceTableRepository from '../../repositories/IPriceTableRepository';
import {  BadRequestError } from '@shared/errors/AppError';
import { IPriceTableDTO } from '@modules/ecommece/dto/IPriceTableDTO';

@injectable()
class CreateService {
  constructor(
    @inject('PriceTableRepository')
    private repository: IPriceTableRepository,
  ) {}

  public async execute(data: IPriceTableDTO) {
    const roleNameExist = await this.repository.findOne({
      name: data.name,
    });
    if (roleNameExist) {
      throw new BadRequestError('O nome da PriceTable já existe');
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'PriceTable criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
