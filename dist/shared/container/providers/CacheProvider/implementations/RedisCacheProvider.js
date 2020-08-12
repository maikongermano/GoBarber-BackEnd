"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cache = _interopRequireDefault(require("../../../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisCacheProvider {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(_cache.default.config.redis);
  }

  async save(key, value) {
    // salvando no redis
    await this.client.set(key, JSON.stringify(value));
  }

  async recover(key) {
    // busca informação
    const data = await this.client.get(key); // se nao econtrar nada retorna nulo

    if (!data) {
      return null;
    }

    const ParsedData = JSON.parse(data);
    return ParsedData;
  }

  async invalidade(key) {
    // excluindo cache com key
    await this.client.del(key);
  }

  async invdalidadePrefix(prefix) {
    // excluindo cache com prefix
    const keys = await this.client.keys(`${prefix}:*`);
    const pipiline = this.client.pipeline();
    keys.forEach(key => {
      pipiline.del(key);
    });
    await pipiline.exec();
  }

}

exports.default = RedisCacheProvider;