import { injectable, inject } from 'tsyringe';
import {
  IPermissaoGrupoDTO,
  IPermissaoGrupoDocument,
} from '../../dto/IPermissaoGrupoDTO';
import IPermissaoGrupoRepository from '../../repositories/IPermissaoGrupoRepository';
import { AppError, BadRequestError } from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(data: IPermissaoGrupoDTO) {
    const roleNameExist = await this.repository.findByName(data.name);
    if (roleNameExist) {
      throw new BadRequestError('O nome da PermissaoGrupo já existe');
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'PermissaoGrupo criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
