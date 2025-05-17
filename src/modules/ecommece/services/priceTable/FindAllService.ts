import { injectable, inject } from 'tsyringe';
import IPriceTableRepository from '../../repositories/IPriceTableRepository';
import { QueryOptions } from 'mongoose';
import { IPriceTableDTO } from '@modules/ecommece/dto/IPriceTableDTO';

@injectable()
export default class FindAllService {
  constructor(
    @inject('PriceTableRepository')
    private repository: IPriceTableRepository,
  ) {}

  public async execute(query: QueryOptions<IPriceTableDTO>) {
    let queryParams = {};
    const data = await this.repository.findAll(queryParams);
    return {
      total: await this.repository.count(queryParams),
      data,
    };
  }
}
