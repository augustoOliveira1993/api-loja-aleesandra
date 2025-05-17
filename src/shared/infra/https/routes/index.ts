import { Router } from 'express';

import users from '@modules/users/infra/https/routes/users.router';
import roleRoutes from '@modules/users/infra/https/routes/roles.router';
import logRoutes from '@modules/log/infra/https/routes/log.router';
import permissaoRoutes from '@modules/users/infra/https/routes/permissao.router';
import permissaoGrupoRoutes from '@modules/users/infra/https/routes/permissaoGrupo.router';
import authRoles from '@modules/users/infra/https/routes/auth.router';


const routes = Router();

routes.use('/auth', authRoles);
routes.use('/users', users);
routes.use('/roles', roleRoutes);
routes.use('/logs', logRoutes);
routes.use('/permissoes', permissaoRoutes);
routes.use('/permissao-grupos', permissaoGrupoRoutes);

export default routes;
