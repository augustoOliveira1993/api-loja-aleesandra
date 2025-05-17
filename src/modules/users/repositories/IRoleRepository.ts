import {
  IResquestQuery,
  IRoleDTO,
  IRoleFindAllResponse,
  IRoleDocument,
} from '@modules/users/dto/IRoleDTO';
import { QueryOptions } from 'mongoose';

export default interface IRoleRepository {
  create(data: IRoleDTO): Promise<IRoleDocument>;
  findByName(name: string): Promise<IRoleDocument | null>;
  findById(id: string): Promise<IRoleDocument | null>;
  findAll(query?: QueryOptions<IRoleDTO>): Promise<IRoleDocument[] | null>;
  update(id: string, data: IRoleDTO): Promise<IRoleDocument | null>;
  delete(id: string): Promise<IRoleDocument | null>;
  addPermissionByRoleId(
    id: string,
    permission: string[],
  ): Promise<IRoleDocument | null>;
  deleteMany(): Promise<boolean>;
  count(query?: QueryOptions<IRoleDTO>): Promise<number>;
}
