import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/log/services/log/FindAll.service';
import CreateService from '@modules/log/services/log/Create.service';
import DeleteService from '@modules/log/services/log/Delete.service';
import FindByIdService from '@modules/log/services/log/FindById.service';
import UpdateService from '@modules/log/services/log/Update.service';
import GetLastRegistroByCategoryService from '@modules/log/services/log/GetLastRegistroByCategoryService';

export default class LogController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute(req.query);
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateService);
    const result = await service.execute(req.body, req.userEmail);

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
    const result = await service.execute(
      req.params.id as string,
      req.body,
      req.userEmail,
    );
    return res.json(result);
  }

  public async getLastRegistroByCategory(req: Request, res: Response) {
    const service = container.resolve(GetLastRegistroByCategoryService);
    const result = await service.execute(req.query);
    return res.json(result);
  }
}
