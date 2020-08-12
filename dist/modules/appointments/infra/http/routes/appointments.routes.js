"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rota: Receber a requisição, chamar outro arquivo(service), devolver uma resposta
// SoC: Separation of Concerns (Separação de preocupações)
const appoimentsRouter = (0, _express.Router)();
const appointmentController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default(); // todas as rotas iram validar autenticação

appoimentsRouter.use(_ensureAuthenticated.default); // rota de criação de dados
// celebrate validações na rota

appoimentsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date()
  }
}), appointmentController.create); // lista agendamento

appoimentsRouter.get('/me', providerAppointmentsController.index);
var _default = appoimentsRouter;
exports.default = _default;