import { Model, QueryOptions, UpdateResult } from 'mongoose';
import { PriceTable } from '@modules/ecommece/infra/mongo/models/PriceTable';
import {
  IPriceTableDTO,
  IPriceTableDocument,
} from '@modules/ecommece/dto/IPriceTableDTO';
import IPriceTableRepository from '@modules/ecommece/repositories/IPriceTableRepository';

export default class PriceTableRepository implements IPriceTableRepository {
  private model: Model<IPriceTableDocument>;

  constructor() {
    this.model = PriceTable;
  }

  async create(data: IPriceTableDTO): Promise<IPriceTableDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(query: QueryOptions<IPriceTableDTO>): Promise<IPriceTableDocument[]> {
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
    data: IPriceTableDTO,
  ): Promise<IPriceTableDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPriceTableDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IPriceTableDocument | null> {
    return await this.model.findById(id);
  }

  async findOne(
    query: QueryOptions<IPriceTableDTO>,
  ): Promise<IPriceTableDocument | null> {
    const { sortBy = 'createdAt', order = 'desc', limit, ...restQuery } = query;
    const mongooseQuery = this.model.findOne(restQuery);
    if (sortBy) {
      mongooseQuery.sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    }
    return await mongooseQuery.exec();
  }

  async count(query: QueryOptions<IPriceTableDTO>): Promise<number> {
    const { sortBy, order, limit, ...restQuery } = query;
    const mongooseQuery = this.model.countDocuments(restQuery);
    if (limit) {
      mongooseQuery.limit(limit);
    }
    return await mongooseQuery.exec();
  }

  async updateMany(
    query: QueryOptions<IPriceTableDTO>,
    data: IPriceTableDTO,
  ): Promise<UpdateResult> {
    return await this.model.updateMany(query, data);
  }
}
