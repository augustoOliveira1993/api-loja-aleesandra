import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import BlocksRepository from '@modules/users/infra/mongo/repositories/BlocksRepository';
import UsersRepository from '@modules/users/infra/mongo/repositories/UsuarioRepository';

import CreateUserService from '@modules/users/services/user/CreateUserService';
import BlockService from '@modules/users/services/block/BlockUser';
import AuthService from '@modules/users/services/auth/AuthenticateUser';
import UpdateUserService from '@modules/users/services/user/UpdateUser';
import AddPermissionsByUserIdService from '@modules/users/services/user/AddPermissionByUserId.service';
import FindAllService from '@modules/users/services/user/FindAll.service';
import AddRoleByUserIdService from '@modules/users/services/user/AddRoleByUserId.service';
import FindByIdService from '@modules/users/services/user/FindById.service';
import GetInfoUserAuthService from '@modules/users/services/user/GetInfoUserAuth.service';
import { logger } from '@shared/utils/logger';
import DeleteServiceService from '@modules/users/services/user/DeleteService';
import RefreshTokenService from '@modules/users/services/user/RefreshTokenService';
import RemovePermissionByUserIdService from '@modules/users/services/user/RemovePermissionByUserIdService';
import RemoveRolesByUserIdService from '@modules/users/services/user/RemoveRolesByUserIdService';
import GetAbilityUserAuthService from '@modules/users/services/auth/GetAbilityUserAuthService';

const authConfig = {
  url: process.env.AD_URL!,
  baseDN: process.env.DOMAIN_CONTROLLER!,
};

const userRepository = new UsersRepository();
const blockRepository = new BlocksRepository();
const blockService = new BlockService(blockRepository);
const authService = new AuthService(
  userRepository,
  blockService,
  blockRepository,
  authConfig,
);

export default class UsersController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const users = await service.execute(req.query);
    return res.json(users);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindByIdService);
    const result = await service.execute(req.params.id);
    return res.status(200).json(result);
  }

  public async signup(req: Request, res: Response): Promise<Response> {
    const {
      username,
      email,
      password,
      permissaos,
      roles,
      status,
      pagina_inicial,
      setor,
      permissoes,
    } = req.body.form;
    try {
      const lastupdate = new Date().toLocaleString();
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({
        username,
        email,
        password,
        permissaos,
        roles,
        pagina_inicial,
        setor,
        status,
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Erro em cadastrar usuário' });
    }
  }

  public async signin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    let ipRequest =
      req.ip?.split(':').length === 3 ? 'local' : req.ip?.split(':')[3];
    const { blocked, minutesLeft } = await blockService.isBlocked(email);
    if (blocked) {
      res.status(401).send({
        message: `Usuário Bloqueado. Aguarde ${minutesLeft} minuto(s) to expire.`,
      });
      return;
    }
    const authResponse = await authService
      .authenticate(email, password)
      .then((resp: any) => {
        logger.info(`[${ipRequest}] Usuário ${email} autenticado com sucesso!`);
        return resp;
      });
    res.status(200).json(authResponse);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userData = req.body;
    try {
      const editUserService = container.resolve(UpdateUserService);
      userData.lastupdate = new Date().toLocaleString();
      const updatedUser = await editUserService.editUser(
        userData._id,
        userData,
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: 'Erro em atualizar usuário' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const userData = req.body;
    const { id } = req.params;
    const editUserService = container.resolve(UpdateUserService);
    const updatedUser = await editUserService.editUser(id, userData);
    return res.status(200).json(updatedUser);
  }

  public async addPermissionByUserId(req: Request, res: Response) {
    const service = container.resolve(AddPermissionsByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async removePermissionByUserId(req: Request, res: Response) {
    const service = container.resolve(RemovePermissionByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async addRolesByUserId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const service = container.resolve(AddRoleByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async removerRolesByUserId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const service = container.resolve(RemoveRolesByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async getUserAuth(req: Request, res: Response) {
    const service = container.resolve(GetInfoUserAuthService);
    const result = await service.execute(req.userId as string);
    return res.status(200).json(result);
  }

  public async create(req: Request, res: Response) {
    const service = container.resolve(CreateUserService);
    const result = await service.execute(req.body);
    return res.status(200).json(result);
  }

  public async refreshToken(req: Request, res: Response) {
    const service = container.resolve(RefreshTokenService);
    const result = await service.execute(req.body.refreshToken as string);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    const service = container.resolve(DeleteServiceService);
    const result = await service.execute(req.params.id);
    return res.status(200).json(result);
  }

  public async getAbilityUserAuth(req: Request, res: Response) {
    const service = container.resolve(GetAbilityUserAuthService);
    const result = await service.execute(req.userId as string);
    return res.status(200).json(result);
  }
}
