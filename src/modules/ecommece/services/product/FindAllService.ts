import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../repositories/IProductRepository';
import { QueryOptions } from 'mongoose';
import { IProductDTO } from '@modules/ecommece/dto/IProductDTO';

@injectable()
export default class FindAllService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  public async execute(query: QueryOptions<IProductDTO>) {
    let queryParams = {};
    const data = await this.repository.findAll(queryParams);
    return {
      total: await this.repository.count(queryParams),
      data,
    };
  }
}
