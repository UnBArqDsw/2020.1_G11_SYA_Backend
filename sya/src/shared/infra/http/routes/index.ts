import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/employees', employeesRouter);
routes.use('/profile', profileRouter);

export default routes;
