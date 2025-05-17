import { Document } from 'mongoose';

export interface IProductDTO {
  code: number;
  name: string;
  description: string;
  sku: string;
  category: string;
  type: string;
  genero: string;
  stock: number;
  base_price: number;
  price_tables: string;
  images: string[]
  active: boolean;
}

export interface IProductDocument extends IProductDTO, Document {}
