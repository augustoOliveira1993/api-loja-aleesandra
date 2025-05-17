import mongoose, { Model, Document, QueryOptions } from 'mongoose';
import { User } from '@modules/users/infra/mongo/models/User';
import {
  IFindAllResponse,
  IUserDTO,
  IUserDocument,
} from '@modules/users/dto/IUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { IResquestQuery } from '@modules/users/dto/IRoleDTO';
import { IModelPopulated } from '@globalTypes/global';
interface IRequestUpdate {
  _id: string;
  username: string;
  status: string;
  email: string;
  avatar_url: string;
  pagina_inicial: string;
  setor: string;
  roles: string[];
  permissions: string;
}

class UserRepository implements IUsersRepository {
  private model: Model<IUserDocument>;
  private modelPupulate: IModelPopulated[];

  constructor() {
    this.model = User;
    this.modelPupulate = [
      {
        path: 'roles',
        select: '-__v',
      },
      {
        path: 'permissaos',
        select: '-__v',
      },
    ];
  }

  public async createUser(userData: IUserDTO): Promise<IUserDocument> {
    const user = new this.model(userData);
    await user.save();
    return user;
  }

  public async save(user: IUserDocument): Promise<IUserDocument> {
    return user.save();
  }

  public async saveUser(user: IUserDocument): Promise<IUserDocument> {
    return user.save();
  }

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    const user = this.model.findOne({ email }).populate(this.modelPupulate);
    return user;
  }

  public async findById(id: string): Promise<IUserDocument | null> {
    const user = this.model.findById(id).populate(this.modelPupulate);
    return user;
  }

  public async findOne(criterio: any): Promise<IUserDocument | null> {
    const user = this.model.findOne(criterio).populate(this.modelPupulate);
    return user;
  }
  public async findAll(
    query: QueryOptions<IUserDTO> = {},
  ): Promise<IUserDocument[] | null> {
    return await this.model.find(query).populate(this.modelPupulate);
  }

  public async updateUser(
    id: string,
    userData: IUserDTO,
  ): Promise<IUserDocument | null> {
    const user = await this.model.findById(id).populate(this.modelPupulate);
    if (user) {
      Object.assign(user, userData);
      await user.save();
      return user;
    }
    return null;
  }

  public async addPermissionByUserId(
    id: string,
    permissions: string[],
  ): Promise<IUserDocument | null> {
    return await this.model
      .findByIdAndUpdate(
        { _id: id },
        { $addToSet: { permissaos: { $each: permissions } } },
        { new: true },
      )
      .populate(this.modelPupulate);
  }

  public async removePermissionByUserId(
    id: string,
    permissions: string[],
  ): Promise<IUserDocument | null> {
    return await this.model
      .findByIdAndUpdate(
        { _id: id },
        { $pull: { permissaos: { $in: permissions } } }, // Remove os elementos que estão no array de permissões
        { new: true },
      )
      .populate(this.modelPupulate);
  }

  public async removerRolesByUserId(
    id: string,
    roles: string[],
  ): Promise<IUserDocument | null> {
    return await this.model
      .findByIdAndUpdate(
        { _id: id },
        { $pull: { roles: { $in: roles } } }, // Remove os elementos que estão no array de roles
        { new: true },
      )
      .populate(this.modelPupulate);
  }

  public async updateManyUsersWithRole(
    roleName: string,
    idRole: string,
  ): Promise<IUserDocument[]> {
    await this.model.updateMany(
      { roles: roleName },
      { $addToSet: { roles: new mongoose.Types.ObjectId(idRole) } },
    );
    return await this.model.find({ roles: idRole });
  }

  public async delete(id: string): Promise<IUserDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  public async getAbilitiesUser(email: string): Promise<any | null> {
    const user = await this.model
      .findOne({
        email,
      })
      .populate(this.modelPupulate);
    return user?.permissaos?.map((p: any) => p?.name as string) || [];
  }

  async deleteMany(): Promise<boolean> {
    const allDeleted = await this.model.deleteMany({});
    return !!allDeleted;
  }

  async count(query: QueryOptions<IUserDTO> = {}) {
    return await this.model.countDocuments(query);
  }
}

export default UserRepository;
