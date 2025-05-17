import { Document } from 'mongoose';

export interface ILogDTO {
  action: string;
  category: string;
  message?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface ILogDocument extends ILogDTO, Document {}

export interface IResquestQuery {
  search: string | null;
}

export interface ILogFindAllResponse {
  documents: ILogDocument[];
  total: number;
}
