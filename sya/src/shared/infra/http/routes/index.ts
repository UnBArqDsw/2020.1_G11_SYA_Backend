import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import worksRouter from '@modules/works/infra/http/routes/works.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/employees', employeesRouter);
routes.use('/works', worksRouter);

export default routes;
