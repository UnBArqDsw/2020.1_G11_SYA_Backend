import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

const appointmentController = new AppointmentsController();

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      employee_id: Joi.string().required(),
      user_id: Joi.string().required(),
      date: Joi.date().required(),
      work_id: Joi.string().required()
    },
  }),
  appointmentController.create
);

appointmentRouter.get('/',ensureAuthenticated,appointmentController.show);



export default appointmentRouter;
