"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// classes próprias de trativas de erros
class AppError {
  // 401 404 codigos de erros
  constructor(message, statusCode = 400) {
    this.message = void 0;
    this.statusCode = void 0;
    this.message = message;
    this.statusCode = statusCode;
  }

}

var _default = AppError;
exports.default = _default;