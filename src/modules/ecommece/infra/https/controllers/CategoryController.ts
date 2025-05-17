import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/ecommece/services/category/FindAllService';
import CreateService from '@modules/ecommece/services/category/CreateService';
import DeleteService from '@modules/ecommece/services/category/DeleteService';
import FindByIdService from '@modules/ecommece/services/category/FindByIdService';
import UpdateService from '@modules/ecommece/services/category/UpdateService';
import { logger } from '@shared/utils/logger';

export default class CategoryController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute(req.query);
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateService);
    const result = await service.execute(req.body);

    return res.json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(DeleteService);
    const result = await service.execute(req.params.id as string);
    return res.json(result);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindByIdService);
    console.log(req.params.id);
    const result = await service.execute(req.params.id as string);
    return res.json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateService);
    const result = await service.execute(req.params.id as string, req.body);
    return res.json(result);
  }
}
