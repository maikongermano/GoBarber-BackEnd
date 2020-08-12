"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// serviço de email
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'maikongermano@gmail.com',
      name: 'Maikon Germano'
    }
  }
};
exports.default = _default;