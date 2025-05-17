import { injectable, inject } from 'tsyringe';
import ICounterRepository from '../../repositories/ICounterRepository';
import { QueryOptions } from 'mongoose';
import { ICounterDTO } from '@modules/ecommece/dto/ICounterDTO';

@injectable()
export default class FindAllService {
  constructor(
    @inject('CounterRepository')
    private repository: ICounterRepository,
  ) {}

  public async execute(query: QueryOptions<ICounterDTO>) {
    let queryParams = {};
    const data = await this.repository.findAll(queryParams);
    return {
      total: await this.repository.count(queryParams),
      data,
    };
  }
}
