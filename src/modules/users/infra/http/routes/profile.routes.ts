import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Rota: Receber a requisição, chamar outro arquivo(service), devolver uma resposta

const profileRouter = Router();
const profileController = new ProfileController();

// autenticação
profileRouter.use(ensureAuthenticated);

// rota de show profile
profileRouter.get('/', profileController.show);
// rota de update profile
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
