import { Model } from 'mongoose';
import { Block } from '@modules/users/infra/mongo/models/Block';
import { IBlockDTO, IBlockDocument } from '@modules/users/dto/IBlockDTO';
import IBlockRepository from '@modules/users/repositories/IBlocksRepository';

class BlockRepository implements IBlockRepository {
  private blockModel: Model<IBlockDocument>;

  constructor() {
    this.blockModel = Block;
  }

  public async createBlock(block: IBlockDTO): Promise<IBlockDocument> {
    const newBlock = new Block(block);
    return newBlock.save();
  }

  public async findByEmail(email: string): Promise<IBlockDocument | null> {
    return Block.findOne({ email }).exec();
  }

  public async findByEmailAndRemove(
    email: string,
  ): Promise<IBlockDocument | null> {
    const document = this.findByEmail(email);
    await Block.deleteMany({ email }).exec();
    return document;
  }
}

export default BlockRepository;
