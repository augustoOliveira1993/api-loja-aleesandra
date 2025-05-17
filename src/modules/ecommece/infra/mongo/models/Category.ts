import mongoose, { Schema } from 'mongoose';
import { ICategoryDocument } from '@modules/ecommece/dto/ICategoryDTO';

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true }, // Ex: 'Amigurumi'
    description: { type: String },
    sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Category = mongoose.model<ICategoryDocument>('Usuario', CategorySchema);
