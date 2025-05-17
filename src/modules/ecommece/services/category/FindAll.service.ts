import { injectable, inject } from 'tsyringe';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import { QueryOptions } from 'mongoose';
import { ICategoryDTO } from '@modules/ecommece/dto/ICategoryDTO';

@injectable()
export default class FindAllService {
  constructor(
    @inject('CategoryRepository')
    private repository: ICategoryRepository,
  ) {}

  public async execute(query: QueryOptions<ICategoryDTO>) {
    let queryParams = {}
    const data = await this.repository.findAll(queryParams);
    return {
      total: await this.repository.count(queryParams),
      data
    };
  }
}
