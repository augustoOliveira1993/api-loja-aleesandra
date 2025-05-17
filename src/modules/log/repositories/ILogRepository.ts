import {
  IResquestQuery,
  ILogDTO,
  ILogFindAllResponse,
  ILogDocument,
} from '@modules/log/dto/ILogDTO';
import { QueryOptions } from 'mongoose';

export default interface ILogRepository {
  create(data: ILogDTO): Promise<ILogDocument>;
  findById(id: string): Promise<ILogDocument | null>;
  findAll(query?: QueryOptions<ILogDTO>): Promise<ILogDocument[]>;
  update(id: string, data: ILogDTO): Promise<ILogDocument | null>;
  delete(id: string): Promise<ILogDocument | null>;
  count(query?: QueryOptions<ILogDTO>): Promise<number>;
}
