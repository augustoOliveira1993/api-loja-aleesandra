import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../repositories/IProductRepository';
import {  BadRequestError } from '@shared/errors/AppError';
import { IProductDTO } from '@modules/ecommece/dto/IProductDTO';

@injectable()
class CreateService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  public async execute(data: IProductDTO) {
    const roleNameExist = await this.repository.findOne({
      name: data.name,
    });
    if (roleNameExist) {
      throw new BadRequestError('O nome da Product já existe');
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'Product criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
