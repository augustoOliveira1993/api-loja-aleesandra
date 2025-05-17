import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../repositories/IProductRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { IProductDTO } from '@modules/ecommece/dto/IProductDTO';

@injectable()
export default class UpdateService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  public async execute(idProduct: string, data: IProductDTO) {
    const roleExist = await this.repository.findById(idProduct);
    if (!roleExist) {
      throw new BadRequestError('Product não encontrada');
    }
    const updateProduct = await this.repository.update(idProduct, data);
    return {
      success: true,
      message: `Product atualizada com sucesso!`,
      data: updateProduct,
    };
  }
}
