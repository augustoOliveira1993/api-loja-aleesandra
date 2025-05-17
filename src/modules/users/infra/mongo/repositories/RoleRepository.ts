import { Model, QueryOptions } from 'mongoose';
import { Role } from '@modules/users/infra/mongo/models/Role';
import {
  IResquestQuery,
  IRoleDTO,
  IRoleDocument,
  IRoleFindAllResponse,
} from '@modules/users/dto/IRoleDTO';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import { logger } from '@shared/utils/logger';

class RoleRepository implements IRoleRepository {
  private model: Model<IRoleDocument>;

  constructor() {
    this.model = Role;
  }

  async create(data: IRoleDTO): Promise<IRoleDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(
    query: QueryOptions<IRoleDTO> = {},
  ): Promise<IRoleDocument[] | null> {
    return this.model.find(query);
  }

  async update(id: string, data: IRoleDTO): Promise<IRoleDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IRoleDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IRoleDocument | null> {
    return await this.model.findById(id);
  }

  async findByName(name: string): Promise<IRoleDocument | null> {
    return await this.model.findOne({ name });
  }

  async addPermissionByRoleId(
    id: string,
    permissions: string[],
  ): Promise<IRoleDocument | null> {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { $addToSet: { permissions: { $each: permissions } } },
      { new: true },
    );
  }

  async deleteMany(): Promise<boolean> {
    const allDeleted = await await this.model.deleteMany({});
    return !!allDeleted;
  }

  async count(query?: QueryOptions<IRoleDTO>): Promise<number> {
    return this.model.countDocuments(query);
  }
}

export default RoleRepository;
