import { Document } from 'mongoose';

export interface IUserDTO {
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

export interface IUserDocument extends IUserDTO, Document {}

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
  data: IUserDTO[];
  total: number;
}

export interface IAddRoleDataBody {
  idsRoles: string[];
}
