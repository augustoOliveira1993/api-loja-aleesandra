import { injectable, inject } from 'tsyringe';
import { IPermissaoDTO, IPermissaoDocument } from '../../dto/IPermissaoDTO';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';
import { AppError, BadRequestError } from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
  ) {}

  public async execute(data: IPermissaoDTO) {
    const roleNameExist = await this.repository.findByName(data.name as string);
    if (roleNameExist) {
      throw new BadRequestError('O nome da permissão já existe');
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'Permissao criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
