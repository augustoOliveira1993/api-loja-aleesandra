import { Model, QueryOptions, UpdateResult } from 'mongoose';
import { Counter } from '@modules/ecommece/infra/mongo/models/Counter';
import {
  ICounterDTO,
  ICounterDocument,
} from '@modules/ecommece/dto/ICounterDTO';
import ICounterRepository from '@modules/ecommece/repositories/ICounterRepository';

export default class CounterRepository implements ICounterRepository {
  private model: Model<ICounterDocument>;

  constructor() {
    this.model = Counter;
  }

  async create(data: ICounterDTO): Promise<ICounterDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async getNextCode(name: 'productCode' |'categoryCode' | 'priceTableCode'): Promise<number> {
    const couter = await this.model.findOneAndUpdate({ name }, { $inc: { seq: 1 } }, { new: true })
    return couter?.seq || 0;
  }

  async findAll(query: QueryOptions<ICounterDTO>): Promise<ICounterDocument[]> {
    const { sortBy = 'createdAt', order = 'desc', limit, ...restQuery } = query;
    const mongooseQuery = this.model.find(restQuery);

    if (sortBy) {
      mongooseQuery.sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    }

    if (limit) {
      mongooseQuery.limit(limit);
    }
    return await mongooseQuery.exec();
  }

  async update(
    id: string,
    data: ICounterDTO,
  ): Promise<ICounterDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ICounterDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ICounterDocument | null> {
    return await this.model.findById(id);
  }

  async findOne(query: QueryOptions<ICounterDTO>): Promise<ICounterDocument | null> {
    const { sortBy = 'createdAt', order = 'desc', limit, ...restQuery } = query;
    const mongooseQuery = this.model.findOne(restQuery);
    if (sortBy) {
      mongooseQuery.sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    }
    return await mongooseQuery.exec();
  }

  async count(query: QueryOptions<ICounterDTO>={}): Promise<number> {
        const { sortBy, order, limit, ...restQuery } = query;
    const mongooseQuery = this.model.countDocuments(restQuery);
    if (limit) {
      mongooseQuery.limit(limit);
    }
    return await mongooseQuery.exec();
  }

  async updateMany(query: QueryOptions<ICounterDTO>, data: ICounterDTO): Promise<UpdateResult> {
    return await this.model.updateMany(query, data);
  }
}
