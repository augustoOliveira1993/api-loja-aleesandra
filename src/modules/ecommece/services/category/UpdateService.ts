import { injectable, inject } from 'tsyringe';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { ICategoryDTO } from '@modules/ecommece/dto/ICategoryDTO';

@injectable()
export default class UpdateService {
  constructor(
    @inject('CategoryRepository')
    private repository: ICategoryRepository,
  ) {}

  public async execute(idCategory: string, data: ICategoryDTO) {
    const roleExist = await this.repository.findById(idCategory);
    if (!roleExist) {
      throw new BadRequestError('Category não encontrada');
    }
    const updateCategory = await this.repository.update(idCategory, data);
    return {
      success: true,
      message: `Category atualizada com sucesso!`,
      data: updateCategory,
    };
  }
}
