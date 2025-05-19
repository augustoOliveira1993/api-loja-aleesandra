import RoleRepository from '@modules/users/infra/mongo/repositories/RoleRepository';
import bcrypt from 'bcryptjs';
import config from '@config/auth.config';
import { AppError } from '@shared/errors/AppError';

import { Usuario} from '@modules/users/infra/mongo/models/Usuario';
import BlockService from '../block/BlockUser';
import UserRepository from '../../infra/mongo/repositories/UsuarioRepository';
import IBlocksRepository from '../../repositories/IBlocksRepository';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import ActiveDirectory from 'activedirectory';
import {
  generateToken,
  generateRefreshToken,
} from '@modules/users/infra/https/middleware/authJWT';

interface AuthConfig {
  url: string;
  baseDN: string;
}

class AuthService {
  private usersRepository: UserRepository;
  private blockService: BlockService;
  private adConfig: AuthConfig;
  private activeDirectory: ActiveDirectory;
  private blockRepository: IBlocksRepository;
  private roleRepository: IRoleRepository;

  constructor(
    usersRepository: UserRepository,
    blockService: BlockService,
    blockRepository: IBlocksRepository,
    authConfig: AuthConfig,
  ) {
    this.usersRepository = usersRepository;
    this.blockService = blockService;
    this.adConfig = authConfig;
    this.blockRepository = blockRepository;
    this.activeDirectory = new ActiveDirectory({
      url: this.adConfig.url,
      baseDN: this.adConfig.baseDN,
    });
    this.roleRepository = new RoleRepository();
  }

  private isUserAdmin(user: any) {
    return (
      user.roles.filter((role: any) => role.name === 'Administrador').length > 0
    );
  }

  private authenticateWithAD(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.activeDirectory.authenticate(
        email,
        password,
        async (err: Error | null, auth: boolean) => {
          if (err) {
            await this.blockService.recordAttempt(email);
            return reject(new AppError('Authentication failed', 400));
          }

          if (auth) {
            let user = await this.usersRepository.findByEmail(email);
            let roleIdDefault = await this.roleRepository.findByName('Usuário');

            if (!user) {
              user = await Usuario.create({
                email,
                password: bcrypt.hashSync(password, 8),
                roles: [roleIdDefault?._id as string],
                status: 'ATIVO',
                pagina_inicial: '/',
                tempo_expiracao_token: '8h',
                username: email?.split('@')[0]?.replace('.', ' '),
              });
            }

            const abilityUser =
              await this.usersRepository.getAbilitiesUser(email);

            let payload = {
              id: user.id,
              email: user.email,
              roles: user.roles,
              is_admin: this.isUserAdmin(user),
              expire_at: user?.tempo_expiracao_token
                ? user?.tempo_expiracao_token
                : config.expiresInRefreshToken,
            };

            const token = generateToken(payload);

            const refreshToken = generateRefreshToken(payload);

            await this.blockService.resetAttempts(email);

            return resolve({
              token,
              refreshToken,
              username: user.username,
              roles: user.roles,
              permissaos: user.permissaos,
              email: user.email,
              pagina_inicial: user.pagina_inicial,
              setor: user.setor,
              avatar_url: user.avatar_url,
              isAdmin: this.isUserAdmin(user),
              ability: abilityUser,
              tempo_expiracao_token: user?.tempo_expiracao_token || null,
              _id: user._id,
              status: user.status,
            });
          }
        },
      );
    });
  }

  private async authenticateLocal(
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('E-mail ou senha Inválida', 404);
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user?.password || (config.password_default as string),
    );

    if (!passwordIsValid) {
      await this.blockService.recordAttempt(email);
      throw new AppError('Senha ou E-mail Inválida', 404);
    }

    let payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
      is_admin: this.isUserAdmin(user),
      expire_at: user?.tempo_expiracao_token
        ? user?.tempo_expiracao_token
        : config.expiresInRefreshToken, // o tempo de expiração do token do usuário
    };

    const token = generateToken(payload);

    const refreshToken = generateRefreshToken(payload);

    await this.blockService.resetAttempts(email);

    const abilityUser = await this.usersRepository.getAbilitiesUser(email);

    return {
      token,
      refreshToken,
      username: user.username,
      roles: user.roles,
      permissaos: user.permissaos,
      email: user.email,
      pagina_inicial: user.pagina_inicial,
      setor: user.setor,
      avatar_url: user.avatar_url,
      isAdmin: this.isUserAdmin(user),
      tempo_expiracao_token: user?.tempo_expiracao_token || null,
      ability: abilityUser,
      _id: user._id,
      status: user.status,
    };
  }

  async authenticate(email: string, password: string): Promise<any> {
    const domain = email.split('@')[1];

    if (
      domain === process.env.DOMAIN_CONTROLLER &&
      email !== 'sincronismo@ferroeste.com.br'
    ) {
      return this.authenticateWithAD(email, password);
    }
    return this.authenticateLocal(email, password);
  }
}

export default AuthService;
