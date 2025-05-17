import { injectable, inject } from 'tsyringe';
import ICounterRepository from '../../repositories/ICounterRepository';
import {  BadRequestError } from '@shared/errors/AppError';
import { ICounterDTO } from '@modules/ecommece/dto/ICounterDTO';

@injectable()
class CreateService {
  constructor(
    @inject('CounterRepository')
    private repository: ICounterRepository,
  ) {}

  public async execute(data: ICounterDTO) {
    const roleNameExist = await this.repository.findOne({
      name: data.name,
    });
    if (roleNameExist) {
      throw new BadRequestError('O nome da Counter já existe');
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'Counter criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
