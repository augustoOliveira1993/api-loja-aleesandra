import { model, Schema } from 'mongoose';
import { IPriceTableDocument } from '@modules/ecommece/dto/IPriceTableDTO';

const schema: Schema = new Schema(
  {
    name: { type: String, required: true }, // Ex: 'Atacado', 'Revenda'
    tipo: { type: String, enum:['Atacado', 'Revenda', 'Cliente Final', 'Black Friday'] }, // Ex: 'Atacado', 'Revenda'
    description: { type: String },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const PriceTable = model<IPriceTableDocument>('PriceTable', schema);
