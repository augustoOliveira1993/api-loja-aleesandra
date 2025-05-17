import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../repositories/IProductRepository';
import {  BadRequestError } from '@shared/errors/AppError';
import { IProductDTO } from '@modules/ecommece/dto/IProductDTO';
import ICounterRepository from '@modules/ecommece/repositories/ICounterRepository';
import { generateSKU } from '@shared/utils/healpers';

@injectable()
class CreateService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
    @inject('CounterRepository')
        private counterRepository: ICounterRepository,
  ) {}

  public async execute(data: IProductDTO) {
    const roleNameExist = await this.repository.findOne({
      name: data.name,
    });
    if (roleNameExist) {
      throw new BadRequestError('O nome da Product já existe');
    }
    data.code = await this.counterRepository.getNextCode('productCode');
    data.sku = generateSKU({
      tipo: data.type,
      size: data.size ,
      cor: data.color,
      codigo: data.code,
    })
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'Product criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
