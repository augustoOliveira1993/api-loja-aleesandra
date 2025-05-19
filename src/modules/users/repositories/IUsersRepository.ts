import {
  IFindAllResponse,
  IResquestQuery,
  IUserDTO,
  IUserDocument,
} from '@modules/users/dto/IUsuarioDTO';
import { QueryOptions } from 'mongoose';

export default interface IUsersRepository {
  createUser(userData: IUserDTO): Promise<IUserDocument>;
  findByEmail(email: string): Promise<IUserDocument | null>;
  findById(id: string): Promise<IUserDocument | null>;
  findOne(criterio: Partial<IUserDocument>): Promise<IUserDocument | null>;
  findAll(query?: QueryOptions<IUserDTO>): Promise<IUserDocument[] | null>;
  updateUser(id: string, userData: IUserDTO): Promise<IUserDocument | null>;
  addPermissionByUserId(
    id: string,
    permission: string[],
  ): Promise<IUserDocument | null>;
  removePermissionByUserId(
    id: string,
    permission: string[],
  ): Promise<IUserDocument | null>;
  removerRolesByUserId(
    id: string,
    roles: string[],
  ): Promise<IUserDocument | null>;
  updateManyUsersWithRole(
    roleName: string,
    idRole: string,
  ): Promise<IUserDocument[]>;
  delete(id: string): Promise<IUserDocument | null>;
  getAbilitiesUser(email: string): Promise<IUserDocument | null>;
  save(user: IUserDocument): Promise<IUserDocument>;
  deleteMany(): Promise<boolean>;
  count(query?: QueryOptions<IUserDTO>): Promise<number>;
}
