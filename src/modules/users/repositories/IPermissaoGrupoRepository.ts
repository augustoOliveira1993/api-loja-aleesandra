import {
  IResquestQuery,
  IPermissaoGrupoDTO,
  IPermissaoGrupoFindAllResponse,
  IPermissaoGrupoDocument,
} from '@modules/users/dto/IPermissaoGrupoDTO';
import { FilterQuery } from 'mongoose';

export default interface IPermissaoGrupoRepository {
  create(data: IPermissaoGrupoDTO): Promise<IPermissaoGrupoDocument>;
  findByName(name: string): Promise<IPermissaoGrupoDocument | null>;
  findById(id: string): Promise<IPermissaoGrupoDocument | null>;
  findAll(query?: IResquestQuery): Promise<IPermissaoGrupoFindAllResponse>;
  findOne(
    criterio: FilterQuery<IPermissaoGrupoDocument>,
  ): Promise<IPermissaoGrupoDocument | null>;
  findAll(query?: IResquestQuery): Promise<IPermissaoGrupoFindAllResponse>;
  update(
    id: string,
    data: IPermissaoGrupoDTO,
  ): Promise<IPermissaoGrupoDocument | null>;
  delete(id: string): Promise<IPermissaoGrupoDocument | null>;
  deleteMany(): Promise<boolean>;

}
