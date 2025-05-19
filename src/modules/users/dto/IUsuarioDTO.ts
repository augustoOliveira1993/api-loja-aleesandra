import { Document } from 'mongoose';

export interface IUsuarioDTO {
  username: string;
  email: string;
  password?: string;
  roles?: string[];
  permissaos?: string[];
  avatar_url?: string;
  setor?: string;
  pagina_inicial?: string;
  status?: string;
  tempo_expiracao_token?: string;
}

export interface IUsuarioDocument extends IUsuarioDTO, Document {}

export interface IDataBodyAddPermissions {
  permissaos: string[];
}

export interface IDataBodyRemoverRoles {
  roles: string[];
}

export interface IResquestQuery {
  search: string | null;
}

export interface IFindAllResponse {
  data: IUsuarioDTO[];
  total: number;
}

export interface IAddRoleDataBody {
  idsRoles: string[];
}
