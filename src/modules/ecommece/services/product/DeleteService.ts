import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../repositories/IProductRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new BadRequestError('Product não encontrada');
    }
    return {
      success: true,
      message: 'Product deletada com sucesso!',
      data: {
        id: roleDeleted.id,
        name: roleDeleted.name,
      },
    };
  }
}

export default DeleteProductService;
