import { Document } from 'mongoose';

export interface IPriceTableDTO {
  name?: string;
  description?: string;
  product?: string;
  price: number;
}

export interface IPriceTableDocument extends IPriceTableDTO, Document {}

export interface IPriceTableFindAllResponse {
  data: IPriceTableDocument[];
  total: number;
}

export interface IDataBodyAddPermissions {
  permissions: string[];
}
