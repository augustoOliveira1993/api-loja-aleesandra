import {
  IResquestQuery,
  IPermissaoDTO,
  IPermissaoFindAllResponse,
  IPermissaoDocument,
} from '@modules/users/dto/IPermissaoDTO';
import { FilterQuery } from 'mongoose';

export default interface IPermissaoRepository {
  create(data: IPermissaoDTO): Promise<IPermissaoDocument>;
  findByName(name: string): Promise<IPermissaoDocument | null>;
  findById(id: string): Promise<IPermissaoDocument | null>;
  findAll(query?: IResquestQuery): Promise<IPermissaoFindAllResponse>;
  findOne(
    criterio: FilterQuery<IPermissaoDocument>,
  ): Promise<IPermissaoDocument | null>;
  findAll(query?: IResquestQuery): Promise<IPermissaoFindAllResponse>;
  update(id: string, data: IPermissaoDTO): Promise<IPermissaoDocument | null>;
  delete(id: string): Promise<IPermissaoDocument | null>;
  deleteMany(): Promise<boolean>;
}
