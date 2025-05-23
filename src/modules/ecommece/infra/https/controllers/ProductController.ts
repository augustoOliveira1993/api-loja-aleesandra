import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/ecommece/services/product/FindAllService';
import CreateService from '@modules/ecommece/services/product/CreateService';
import DeleteService from '@modules/ecommece/services/product/DeleteService';
import FindByIdService from '@modules/ecommece/services/product/FindByIdService';
import UpdateService from '@modules/ecommece/services/product/UpdateService';
import { logger } from '@shared/utils/logger';

export default class ProductController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute(req.query);
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateService);
    const result = await service.execute(req.body, req.files as Express.Multer.File[]);

    return res.json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(DeleteService);
    const result = await service.execute(req.params.id as string);
    return res.json(result);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindByIdService);
    const result = await service.execute(req.params.id as string);
    return res.json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateService);
    const result = await service.execute(req.params.id as string, req.body);
    return res.json(result);
  }
}
