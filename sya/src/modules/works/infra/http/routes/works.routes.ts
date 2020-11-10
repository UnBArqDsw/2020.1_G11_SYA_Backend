import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import WorksController from '@modules/works/infra/http/controllers/WorksController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const workRouter = Router();

const workController = new WorksController();
workRouter.use(ensureAuthenticated);
workRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      duration: Joi.string().required(),
    },
  }),
  workController.create
);

workRouter.get('/', workController.get);

export default workRouter;
