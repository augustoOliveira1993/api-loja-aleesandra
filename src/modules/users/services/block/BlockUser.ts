import { injectable, inject } from 'tsyringe';
import { IBlockDTO } from '@modules/users/dto/IBlockDTO';
import IBlocksRepository from '@modules/users/repositories/IBlocksRepository';

@injectable()
export default class BlockService {
  constructor(
    @inject('BlocksRepository')
    private blockRepository: IBlocksRepository,
  ) {}

  async recordAttempt(email: string): Promise<IBlockDTO> {
    let block = await this.blockRepository.findByEmail(email);

    if (!block) {
      const blockData = {
        email,
        tipo: 'Login',
        tentativas: 1,
        date: new Date(),
      };
      block = await this.blockRepository.createBlock(blockData);
    } else {
      const timeSinceLastAttempt =
        (new Date().getTime() - new Date(block.date).getTime()) / (1000 * 60);
      if (block.tentativas >= 3 && timeSinceLastAttempt >= 30) {
        block.tentativas = 1;
        block.date = new Date();
      } else {
        block.tentativas += 1;
        block.date = new Date();
      }
      await block.save();
    }

    return block;
  }

  async resetAttempts(email: string): Promise<void> {
    const block = await this.blockRepository.findByEmail(email);

    if (block) {
      await this.blockRepository.findByEmailAndRemove(email);
    }
  }

  async isBlocked(email: string): Promise<{
    blocked: boolean;
    minutesLeft: number | null;
    attempts: number | null;
  }> {
    const block = await this.blockRepository.findByEmail(email);

    if (block && block.tentativas >= 3) {
      const timeSinceLastAttempt =
        (new Date().getTime() - new Date(block.date).getTime()) / (1000 * 60);
      if (timeSinceLastAttempt < 30) {
        return {
          blocked: true,
          minutesLeft: 30 - Math.floor(timeSinceLastAttempt),
          attempts: block.tentativas,
        };
      } else {
        await this.resetAttempts(email);
      }
    }

    return { blocked: false, minutesLeft: null, attempts: null };
  }
}
