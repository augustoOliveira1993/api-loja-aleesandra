import { injectable, inject } from 'tsyringe';
import { IResquestQuery } from '../../dto/IPermissaoDTO';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';

@injectable()
export default class FindAllService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
  ) {}

  public async execute(query: IResquestQuery) {
    const data = await this.repository.findAll(query);
    return data;
  }
}
