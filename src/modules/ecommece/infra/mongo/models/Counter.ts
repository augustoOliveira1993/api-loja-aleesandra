import { model, Schema } from 'mongoose';
import { ICounterDocument } from '@modules/ecommece/dto/ICounterDTO';

const schema: Schema = new Schema(
  {
    name: { type: String, required: true, enum: ['productCode', 'categoryCode', 'priceTableCode'] },
    seq: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const Counter = model<ICounterDocument>(
  'Counter',
  schema,
);
