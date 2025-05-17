import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/users/services/permissaoGrupo/FindAll.service';
import CreateService from '@modules/users/services/permissaoGrupo/Create.service';
import DeleteService from '@modules/users/services/permissaoGrupo/Delete.service';
import FindByIdService from '@modules/users/services/permissaoGrupo/FindById.service';
import UpdateService from '@modules/users/services/permissaoGrupo/Update.service';
import { logger } from '@shared/utils/logger';

export default class PermissaoGrupoController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute({
      search: req.query.search as string | '',
    });
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
    const result = await service.execute(req.params.id as string);
    return res.json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateService);
    const result = await service.execute(req.params.id as string, req.body);
    return res.json(result);
  }
}
