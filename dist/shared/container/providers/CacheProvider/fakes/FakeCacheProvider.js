"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeCacheProvider {
  constructor() {
    this.cache = {};
  }

  async save(key, value) {
    this.cache[key] = JSON.stringify(value);
  }

  async recover(key) {
    // busca informação
    const data = this.cache[key]; // se nao econtrar nada retorna nulo

    if (!data) {
      return null;
    }

    const ParsedData = JSON.parse(data);
    return ParsedData;
  }

  async invalidade(key) {
    // excluindo cache com key
    delete this.cache[key];
  }

  async invdalidadePrefix(prefix) {
    // excluindo cache com prefix
    const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}:`));
    keys.forEach(key => {
      delete this.cache[key];
    });
  }

}

exports.default = FakeCacheProvider;