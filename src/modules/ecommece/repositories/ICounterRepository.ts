import {
  ICounterDTO,
  ICounterDocument,
} from '@modules/ecommece/dto/ICounterDTO';
import { QueryOptions, UpdateResult } from 'mongoose';

export default interface ICounterRepository {
  create(data: ICounterDTO): Promise<ICounterDocument>;
  findById(id: string): Promise<ICounterDocument | null>;
  findAll(query?: QueryOptions<ICounterDTO>): Promise<ICounterDocument[]>;
  findOne(query: QueryOptions<ICounterDTO>): Promise<ICounterDocument | null>;
  update(id: string, data: ICounterDTO): Promise<ICounterDocument | null>;
  updateMany(query: QueryOptions<ICounterDTO>, data: ICounterDTO): Promise<UpdateResult>;
  delete(id: string): Promise<ICounterDocument | null>;
  count(query?: QueryOptions<ICounterDTO>): Promise<number>;
  getNextCode(name: 'productCode' |'categoryCode' | 'priceTableCode'): Promise<number | undefined>;
}
