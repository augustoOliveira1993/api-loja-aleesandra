import { injectable, inject } from 'tsyringe';
import IPriceTableRepository from '../../repositories/IPriceTableRepository';
import {  BadRequestError } from '@shared/errors/AppError';
import { IPriceTableDTO } from '@modules/ecommece/dto/IPriceTableDTO';
import IProductRepository from '@modules/ecommece/repositories/IProductRepository';

@injectable()
class CreateService {
  constructor(
    @inject('PriceTableRepository')
    private repository: IPriceTableRepository,
        @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(data: IPriceTableDTO) {
    const roleNameExist = await this.repository.findOne({
      name: data.name,
    });
    if (roleNameExist) {
      throw new BadRequestError('O nome da PriceTable já existe');
    }

    const productExist = await this.productRepository.findById(data.product as string)
    if (!productExist) {
      throw new BadRequestError('Produto não encontrado!')
    }

    const created = await this.repository.create(data);
    await this.productRepository.addPriceTable(data.product as string, created._id as string)
    return {
      success: true,
      message: 'PriceTable criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
