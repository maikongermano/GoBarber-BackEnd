"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _redis = _interopRequireDefault(require("redis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// configurando redis
const RedisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
}); // configurando tentativas 5 tentativa a cada 1s


const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: RedisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
  blockDuration: 15
}); // segurança dados contra ataque

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new _AppError.default('Too many reqyests', 429);
  }
}