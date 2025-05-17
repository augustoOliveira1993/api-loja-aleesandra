import mongoose, {  Schema } from 'mongoose';
import { IProductDocument } from '@modules/ecommece/dto/IProductDTO';

const blockSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },

    // Dados principais para SKU
    type: { type: String, required: true }, // Ex: 'urso', 'coelho'
    color: { type: String, required: true }, // Ex: 'azul'
    size: { type: String, enum: ['P', 'M', 'G'], required: true },

    code: { type: Number, required: true, unique: true }, // Código incremental para SKU
    sku: { type: String, required: true, unique: true }, // SKU gerado automaticamente

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    basePrice: { type: Number, required: true }, // Preço base do produto

    priceTableIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'PriceTable' },
    ], // Referência à tabela de preços
    stock: { type: Number, default: 0 }, // Estoque disponível
    images: [String], // URLs das imagens
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<IProductDocument>('Product', blockSchema);