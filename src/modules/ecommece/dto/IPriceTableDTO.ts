import { Document } from 'mongoose';

export interface IPriceTableDTO {
  name?: string;
  roles?: string[];
  permissao_grupos?: string[];
}

export interface IPriceTableDocument extends IPriceTableDTO, Document {}

export interface IPriceTableFindAllResponse {
  data: IPriceTableDocument[];
  total: number;
}

export interface IDataBodyAddPermissions {
  permissions: string[];
}
