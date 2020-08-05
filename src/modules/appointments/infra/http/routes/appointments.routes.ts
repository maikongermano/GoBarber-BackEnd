import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

// Rota: Receber a requisição, chamar outro arquivo(service), devolver uma resposta

// SoC: Separation of Concerns (Separação de preocupações)

const appoimentsRouter = Router();
const appointmentController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// todas as rotas iram validar autenticação
appoimentsRouter.use(ensureAuthenticated);

// rota de criação de dados
// celebrate validações na rota
appoimentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentController.create,
);

// lista agendamento
appoimentsRouter.get('/me', providerAppointmentsController.index);

export default appoimentsRouter;
