import {
  IProductDTO,
  IProductDocument,
} from '@modules/ecommece/dto/IProductDTO';
import { QueryOptions, UpdateResult } from 'mongoose';

export default interface IProductRepository {
  create(data: IProductDTO): Promise<IProductDocument>;
  findById(id: string): Promise<IProductDocument | null>;
  findAll(query?: QueryOptions<IProductDTO>): Promise<IProductDocument[]>;
  findOne(query: QueryOptions<IProductDTO>): Promise<IProductDocument | null>;
  update(id: string, data: IProductDTO): Promise<IProductDocument | null>;
  updateMany(query: QueryOptions<IProductDTO>, data: IProductDTO): Promise<UpdateResult>;
  delete(id: string): Promise<IProductDocument | null>;
  count(query?: QueryOptions<IProductDTO>): Promise<number>;
}
