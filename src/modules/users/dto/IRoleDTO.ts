import { Document } from 'mongoose';

export interface IRoleDTO {
  name: string;
}

export interface IRoleDocument extends IRoleDTO, Document {}

export interface IResquestQuery {
  search: string | null;
}

export interface IRoleFindAllResponse {
  data: IRoleDocument[];
  total: number;
}

export interface IDataBodyAddPermissions {
  permissions: string[];
}
