import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../repositories/IProductRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { IProductDTO } from '@modules/ecommece/dto/IProductDTO';
import ICounterRepository from '@modules/ecommece/repositories/ICounterRepository';
import { generateSKU } from '@shared/utils/healpers';
import fs from 'fs-extra';
import path from 'path';
import uploadConfig from '@config/upload';

@injectable()
class CreateService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
    @inject('CounterRepository')
    private counterRepository: ICounterRepository,
  ) {}

  public async execute(data: IProductDTO, files: Express.Multer.File[]) {
    const existing = await this.repository.findOne({ name: data.name });
    if (existing) throw new BadRequestError('O nome da Product já existe');

    const newCode = await this.counterRepository.getNextCode('productCode');
    if (newCode) data.code = newCode;

    data.sku = generateSKU({
      type: data.type,
      genero: data.genero,
      codigo: data.code,
    });

    // Criar pasta com nome do SKU
    const uploadDir = path.resolve(uploadConfig.directory, 'product-images', data.sku);
    await fs.ensureDir(uploadDir);

    // Mover os arquivos para a pasta do SKU
    const imagePaths: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const destPath = path.join(uploadDir, file.originalname);
        await fs.move(file.path, destPath, { overwrite: true });
        imagePaths.push(`/product-images/${data.sku}/${file.originalname}`);
      }
    }

    data.images = imagePaths;

    const created = await this.repository.create(data);

    return {
      success: true,
      message: 'Produto criado com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
