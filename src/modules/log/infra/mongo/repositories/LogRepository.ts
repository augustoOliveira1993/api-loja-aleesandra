import { Model, QueryOptions } from 'mongoose';
import { Log } from '@modules/log/infra/mongo/models/Log';
import {
  IResquestQuery,
  ILogDTO,
  ILogDocument,
  ILogFindAllResponse,
} from '@modules/log/dto/ILogDTO';
import ILogRepository from '@modules/log/repositories/ILogRepository';

export default class LogRepository implements ILogRepository {
  private model: Model<ILogDocument>;

  constructor() {
    this.model = Log;
  }

  async create(data: ILogDTO): Promise<ILogDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(query: QueryOptions<ILogDTO>): Promise<ILogDocument[]> {
    return await this.model.find(query).sort({ createdAt: -1 });
  }

  async update(id: string, data: ILogDTO): Promise<ILogDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ILogDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ILogDocument | null> {
    return await this.model.findById(id);
  }

  async count(query?: QueryOptions<ILogDTO>): Promise<number> {
    return await this.model.countDocuments(query);
  }
}
