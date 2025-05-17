import {
  FilterQuery,
  Model,
  QueryOptions,
  UpdateResult,
  model,
} from 'mongoose';
import { Category } from '@modules/ecommece/infra/mongo/models/Category';
import {
  ICategoryDTO,
  ICategoryDocument,
  ICategoryFindAllResponse,
} from '@modules/ecommece/dto/ICategoryDTO';
import ICategoryRepository from '@modules/ecommece/repositories/ICategoryRepository';
import { logger } from '@shared/utils/logger';
import { IModelPopulated } from '@shared/types/global';

class CategoryRepository implements ICategoryRepository {
  private model: Model<ICategoryDocument>;
  private modelPopulate: IModelPopulated[];
  constructor() {
    this.model = Category;
    this.modelPopulate = [
      {
        path: 'sub_category',
      },
    ];
  }
  updateMany(
    query: QueryOptions<ICategoryDTO>,
    data: ICategoryDTO,
  ): Promise<UpdateResult> {
    return this.model.updateMany(query, data);
  }
  async count(query: QueryOptions<ICategoryDTO>={}): Promise<number> {
    const { sortBy, order, limit, ...restQuery } = query;
    const mongooseQuery = this.model.countDocuments(restQuery);
    if (limit) {
      mongooseQuery.limit(limit);
    }
    return await mongooseQuery.exec();
  }

  async create(data: ICategoryDTO): Promise<ICategoryDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(
    query: QueryOptions<ICategoryDTO> = {},
  ): Promise<ICategoryDocument[]> {
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
    data: ICategoryDTO,
  ): Promise<ICategoryDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ICategoryDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ICategoryDocument | null> {
    return await this.model.findById(id).populate(this.modelPopulate);
  }

  async findByName(name: string): Promise<ICategoryDocument | null> {
    return await this.model.findOne({ name }).populate(this.modelPopulate);
  }
  async findOne(
    query: FilterQuery<ICategoryDocument>,
  ): Promise<ICategoryDocument | null> {
    const { sortBy = 'createdAt', order = 'desc', limit, ...restQuery } = query;
    const mongooseQuery = this.model.findOne(restQuery);
    if (sortBy) {
      mongooseQuery.sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    }
    return await this.model.findOne(restQuery).populate(this.modelPopulate);
  }

  async deleteMany(): Promise<boolean> {
    const allDeleted = await await this.model.deleteMany({});
    return !!allDeleted;
  }
}

export default CategoryRepository;
