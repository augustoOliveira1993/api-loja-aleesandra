import { Model, QueryOptions, UpdateResult } from 'mongoose';
import { Product } from '@modules/ecommece/infra/mongo/models/Product';
import {
  IProductDTO,
  IProductDocument,
} from '@modules/ecommece/dto/IProductDTO';
import IProductRepository from '@modules/ecommece/repositories/IProductRepository';
import { IModelPopulated } from '@shared/types/global';

export default class ProductRepository implements IProductRepository {
  private model: Model<IProductDocument>;
  private modelPopulate: IModelPopulated[];

  constructor() {
    this.model = Product;
    this.modelPopulate = [
      {
        path: 'category',
        select: '-__v',
      }
    ]
  }

  async create(data: IProductDTO): Promise<IProductDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(query: QueryOptions<IProductDTO>): Promise<IProductDocument[]> {
    const { sortBy = 'createdAt', order = 'desc', limit, ...restQuery } = query;
    const mongooseQuery = this.model.find(restQuery);

    if (sortBy) {
      mongooseQuery.sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    }

    if (limit) {
      mongooseQuery.limit(limit);
    }
    return await mongooseQuery.populate(this.modelPopulate).exec()
  }

  async update(
    id: string,
    data: IProductDTO,
  ): Promise<IProductDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IProductDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IProductDocument | null> {
    return await this.model.findById(id).populate(this.modelPopulate);
  }

  async findOne(
    query: QueryOptions<IProductDTO>,
  ): Promise<IProductDocument | null> {
    const { sortBy = 'createdAt', order = 'desc', limit, ...restQuery } = query;
    const mongooseQuery = this.model.findOne(restQuery);
    if (sortBy) {
      mongooseQuery.sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    }
    return await mongooseQuery.populate(this.modelPopulate).exec();
  }

  async count(query: QueryOptions<IProductDTO>): Promise<number> {
    const { sortBy, order, limit, ...restQuery } = query;
    const mongooseQuery = this.model.countDocuments(restQuery);
    if (limit) {
      mongooseQuery.limit(limit);
    }
    return await mongooseQuery.exec();
  }

  async updateMany(
    query: QueryOptions<IProductDTO>,
    data: IProductDTO,
  ): Promise<UpdateResult> {
    return await this.model.updateMany(query, data);
  }
}
