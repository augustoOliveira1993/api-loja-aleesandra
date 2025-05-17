import { Document } from 'mongoose';

export interface ICategoryDTO {
  name: string;
  description: string;
  sub_category: string;
}

export interface ICategoryDocument extends ICategoryDTO, Document {}
export interface ICategoryFindAllResponse {
  data: ICategoryDocument[];
  total: number;
}

export interface IDataBodyAddPermissions {
  permissions: string[];
}
