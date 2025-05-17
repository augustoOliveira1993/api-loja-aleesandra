import {
  ICategoryDTO,
  ICategoryDocument,
} from '@modules/ecommece/dto/ICategoryDTO';
import { QueryOptions, UpdateResult } from 'mongoose';

export default interface ICategoryRepository {
  create(data: ICategoryDTO): Promise<ICategoryDocument>;
  findById(id: string): Promise<ICategoryDocument | null>;
  findAll(query?: QueryOptions<ICategoryDTO>): Promise<ICategoryDocument[]>;
  findOne(query: QueryOptions<ICategoryDTO>): Promise<ICategoryDocument | null>;
  update(id: string, data: ICategoryDTO): Promise<ICategoryDocument | null>;
  updateMany(query: QueryOptions<ICategoryDTO>, data: ICategoryDTO): Promise<UpdateResult>;
  delete(id: string): Promise<ICategoryDocument | null>;
  count(query?: QueryOptions<ICategoryDTO>): Promise<number>;
}
