import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EmployeesController from '@modules/employees/infra/http/controllers/EmployeesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const employeeRouter = Router();

const employeeController = new EmployeesController();
employeeRouter.use(ensureAuthenticated);
employeeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
    },
  }),
  employeeController.create
);

employeeRouter.get('/', employeeController.show);

export default employeeRouter;
