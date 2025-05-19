import { injectable, inject } from 'tsyringe';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import {  BadRequestError } from '@shared/errors/AppError';
import { ICategoryDTO } from '@modules/ecommece/dto/ICategoryDTO';

@injectable()
class CreateService {
  constructor(
    @inject('CategoryRepository')
    private repository: ICategoryRepository,
  ) {}

  public async execute(data: ICategoryDTO) {
    const roleNameExist = await this.repository.findOne({
      name: data.name,
    });
    if (roleNameExist) {
      throw new BadRequestError('O nome da Category já existe');
    }

    if (data?.sub_category) {
      const subCategoryExist = await this.repository.findById(data.sub_category);
      if (!subCategoryExist) {
        throw new BadRequestError('SubCategory nao encontrada');
      }
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'Category criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
