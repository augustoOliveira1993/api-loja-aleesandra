import mongoose, { Schema } from 'mongoose';
import { IUsuarioDocument } from '@modules/users/dto/IUsuarioDTO';

const UsuarioSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    permissaos: [{ type: Schema.Types.ObjectId, ref: 'Permissao' }],
    avatar_url: { type: String },
    setor: { type: String },
    pagina_inicial: { type: String },
    status: { type: String, default: 'ATIVO' },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    tempo_expiracao_token: { type: String, default: '8h' },
  },
  {
    timestamps: true,
  },
);

export const Usuario = mongoose.model<IUsuarioDocument>('Usuario', UsuarioSchema);
