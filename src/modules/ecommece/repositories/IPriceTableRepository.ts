import {
  IPriceTableDTO,
  IPriceTableDocument,
} from '@modules/ecommece/dto/IPriceTableDTO';
import { QueryOptions, UpdateResult } from 'mongoose';

export default interface IPriceTableRepository {
  create(data: IPriceTableDTO): Promise<IPriceTableDocument>;
  findById(id: string): Promise<IPriceTableDocument | null>;
  findAll(query?: QueryOptions<IPriceTableDTO>): Promise<IPriceTableDocument[]>;
  findOne(query: QueryOptions<IPriceTableDTO>): Promise<IPriceTableDocument | null>;
  update(id: string, data: IPriceTableDTO): Promise<IPriceTableDocument | null>;
  updateMany(query: QueryOptions<IPriceTableDTO>, data: IPriceTableDTO): Promise<UpdateResult>;
  delete(id: string): Promise<IPriceTableDocument | null>;
  count(query?: QueryOptions<IPriceTableDTO>): Promise<number>;
}
