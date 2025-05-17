import { Document } from 'mongoose';

export interface IProductDTO {
  code: number;
  name: string;
  description: string;
  sku: string;
  category: string;
  type: string;
  color: string;
  size: string;
  stock: number;
  base_price: number;
  tabela_preco: string;
  images: string[]
  active: boolean;
}

export interface IProductDocument extends IProductDTO, Document {}
