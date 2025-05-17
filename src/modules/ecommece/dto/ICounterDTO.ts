import { Document } from 'mongoose';

export interface ICounterDTO {
  name: 'productCode' | 'categoryCode' | 'priceTableCode';
  seq: number;
}

export interface ICounterDocument extends ICounterDTO, Document {}
