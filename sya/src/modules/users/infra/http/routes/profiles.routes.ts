import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      business_area: Joi.string().required(),
      business_name: Joi.string().required(),
      finish_hour: Joi.date().required(),
      initial_hour: Joi.date().required(),
      operating_day: Joi.string().required(),
    },
  }),
  profileController.update
);

export default profileRouter;
