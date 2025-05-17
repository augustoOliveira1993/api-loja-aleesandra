import { IBlockDTO, IBlockDocument } from '@modules/users/dto/IBlockDTO';

export default interface IBlockRepository {
  createBlock(blockData: IBlockDTO): Promise<IBlockDocument>;
  findByEmail(email: string): Promise<IBlockDocument | null>;
  findByEmailAndRemove(email: string): Promise<IBlockDocument | null>;
}
