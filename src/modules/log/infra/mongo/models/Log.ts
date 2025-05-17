import { ILogDocument } from '@modules/log/dto/ILogDTO';
import mongose, { Schema } from 'mongoose';

const schema: Schema = new Schema(
  {
    action: { type: String, required: true },
    category: { type: String, required: true },
    created_by: { type: String, required: true },
    updated_by: { type: String },
    message: { type: String, required: true },
    diff: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Log = mongose.model<ILogDocument>('Log', schema);
