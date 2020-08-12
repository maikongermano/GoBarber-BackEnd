"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _UserTokens = _interopRequireDefault(require("../../infra/typeorm/entities/UserTokens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class responsavel pelo repositorio e metodos
class FakeUserTokensRepository {
  constructor() {
    this.usersTokens = [];
  }

  async generate(user_id) {
    const userToken = new _UserTokens.default();
    Object.assign(userToken, {
      id: (0, _uuidv.uuid)(),
      token: (0, _uuidv.uuid)(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const userToken = this.usersTokens.find(findToken => findToken.token === token);
    return userToken;
  }

}

var _default = FakeUserTokensRepository;
exports.default = _default;