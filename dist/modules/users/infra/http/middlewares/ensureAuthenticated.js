"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticade;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// função middleware para verificação de usuario auntenticado
function ensureAuthenticade(request, response, next) {
  // validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  } // Bearer saudihis


  const [, token] = authHeader.split(' '); // segundo parametro secret que geramos no arquivo authconfig

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded; // as força o tipo da variavel com a interface

    request.user = {
      id: sub
    };
    return next();
  } catch (err) {
    throw new _AppError.default('Invalid JWT token', 401);
  }
}