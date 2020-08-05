import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

// Rota: Receber a requisição, chamar outro arquivo(service), devolver uma resposta

const sessionsRouter = Router();
const sessionsController = new SessionsController();
// rota de criação de dados
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
