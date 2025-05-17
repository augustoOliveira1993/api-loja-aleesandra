import { injectable, inject } from 'tsyringe';
import { IResquestQuery, IRoleDTO } from '../../dto/IRoleDTO';
import IRoleRepository from '../../repositories/IRoleRepository';
import { QueryOptions } from 'mongoose';

@injectable()
export default class FindAllService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(query: QueryOptions<IRoleDTO>) {
    let queryParams = {};

    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      queryParams = {
        ...queryParams,
        $or: [{ name: { $regex: searchRegex } }],
      };
    }
    return {
      total: await this.repository.count(queryParams),
      data: await this.repository.findAll(queryParams),
    };
  }
}
