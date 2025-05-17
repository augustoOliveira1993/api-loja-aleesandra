import jwt from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { BadRequestError, UnauthorizedError } from '@shared/errors/AppError';
import {
  generateRefreshToken,
  generateToken,
} from '@modules/users/infra/https/middleware/authJWT';
import BlockService from '../block/BlockUser';
import config from '@config/auth.config';

@injectable()
export default class RefreshTokenService {
  private blockService: BlockService;
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    blockService: BlockService,
  ) {
    this.blockService = blockService;
  }

  private isUserAdmin(user: any) {
    return (
      user.roles.filter((role: any) => role.name === 'Administrador').length > 0
    );
  }

  public async execute(refreshTokenBody: string) {
    return jwt.verify(
      refreshTokenBody,
      config.refreshSecret as string,
      async (err: any, decoded: any) => {
        if (err) {
          throw new UnauthorizedError('Token inválido!');
        }

        const userExist = await this.usersRepository.findById(decoded.id);
        if (!userExist) {
          throw new BadRequestError('Usuário não encontrado!');
        }

        const abilityUser = await this.usersRepository.getAbilitiesUser(
          userExist.email,
        );

        let estruturaRm: string | undefined = '';

        let payload = {
          id: userExist.id,
          email: userExist.email,
          roles:
            userExist?.roles?.map((role: any) => ({
              _id: role._id,
              nome: role.nome,
            })) || [],
          is_admin: this.isUserAdmin(userExist),
          expire_at: userExist?.tempo_expiracao_token
            ? userExist?.tempo_expiracao_token
            : config.expiresInRefreshToken, // o tempo de expiração do token do usuário
        };

        const token = generateToken(payload);

        const refreshToken = generateRefreshToken(payload);

        await this.blockService.resetAttempts(payload.email);

        return {
          token,
          refreshToken,
          username: userExist.username,
          roles: userExist.roles,
          permissaos: userExist.permissaos,
          email: userExist.email,
          pagina_inicial: userExist.pagina_inicial,
          setor: userExist.setor,
          avatar_url: userExist.avatar_url,
          ability: abilityUser,
          _id: userExist._id,
          status: userExist.status,
          isAdmin: this.isUserAdmin(userExist),
          tempo_expiracao_token: userExist?.tempo_expiracao_token || null,
        };
      },
    );
  }
}
