import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '@modules/users/infra/http/controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      business_area: Joi.string().required(),
      business_name: Joi.string().required(),
      finish_hour: Joi.date().required(),
      initial_hour: Joi.date().required(),
      operating_day: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  userController.create
);

export default userRouter;
