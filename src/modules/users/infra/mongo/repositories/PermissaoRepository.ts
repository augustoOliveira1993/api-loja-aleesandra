import { FilterQuery, Model } from 'mongoose';
import { Permissao } from '@modules/users/infra/mongo/models/Permissao';
import {
  IResquestQuery,
  IPermissaoDTO,
  IPermissaoDocument,
  IPermissaoFindAllResponse,
} from '@modules/users/dto/IPermissaoDTO';
import IPermissaoRepository from '@modules/users/repositories/IPermissaoRepository';
import { logger } from '@shared/utils/logger';

class PermissaoRepository implements IPermissaoRepository {
  private model: Model<IPermissaoDocument>;

  constructor() {
    this.model = Permissao;
  }

  async create(data: IPermissaoDTO): Promise<IPermissaoDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(
    dataQuery: IResquestQuery = { search: null },
  ): Promise<IPermissaoFindAllResponse> {
    let query = {};

    if (dataQuery.search) {
      query = {
        name: { $regex: dataQuery.search, $options: 'i' },
      };
    }
    return {
      data: await this.model.find(query).populate('roles permissao_grupos'),
      total: await this.model.countDocuments(query),
    };
  }

  async update(
    id: string,
    data: IPermissaoDTO,
  ): Promise<IPermissaoDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPermissaoDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IPermissaoDocument | null> {
    return await this.model.findById(id).populate('roles permissao_grupos');
  }

  async findByName(name: string): Promise<IPermissaoDocument | null> {
    return await this.model
      .findOne({ name })
      .populate('roles permissao_grupos');
  }
  async findOne(
    criterio: FilterQuery<IPermissaoDocument>,
  ): Promise<IPermissaoDocument | null> {
    return await this.model
      .findOne(criterio)
      .populate('roles permissao_grupos');
  }

  async deleteMany(): Promise<boolean> {
    const allDeleted = await await this.model.deleteMany({});
    return !!allDeleted;
  }
}

export default PermissaoRepository;
