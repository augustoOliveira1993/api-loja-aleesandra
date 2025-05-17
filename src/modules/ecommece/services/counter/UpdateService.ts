import { injectable, inject } from 'tsyringe';
import ICounterRepository from '../../repositories/ICounterRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { ICounterDTO } from '@modules/ecommece/dto/ICounterDTO';

@injectable()
export default class UpdateService {
  constructor(
    @inject('CounterRepository')
    private repository: ICounterRepository,
  ) {}

  public async execute(idCounter: string, data: ICounterDTO) {
    const roleExist = await this.repository.findById(idCounter);
    if (!roleExist) {
      throw new BadRequestError('Counter não encontrada');
    }
    const updateCounter = await this.repository.update(idCounter, data);
    return {
      success: true,
      message: `Counter atualizada com sucesso!`,
      data: updateCounter,
    };
  }
}
