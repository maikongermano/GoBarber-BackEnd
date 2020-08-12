"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("express-async-errors");

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// variaveis de ambiente
// evita acesso indevido
// mensagem de validação
// conecta com o arquivo para fazer conexao do banco de dados
// carrega dependencias
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json()); // rota estatica para exibir arquivo

app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_rateLimiter.default); // segurança limite de requisições

app.use(_routes.default);
app.use((0, _celebrate.errors)()); // erros na validação das rotas
// tratativas de erros na rota

app.use((err, request, response, _) => {
  // se for um erro conhecido faço uma mensagem melhor para o front
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  } // eslint-disable-next-line no-console


  console.log(err); // erro inesperado

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server starded on port 3333!');
});