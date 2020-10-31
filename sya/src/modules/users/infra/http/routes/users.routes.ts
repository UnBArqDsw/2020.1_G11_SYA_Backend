import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '@modules/users/infra/http/controllers/UserController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersAvatarController from '../controllers/UsersAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig.multer);

const userController = new UserController();
const usersAvatarController = new UsersAvatarController();

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

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
);

export default userRouter;
