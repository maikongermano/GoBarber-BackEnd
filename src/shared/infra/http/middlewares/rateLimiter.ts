import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

// configurando redis
const RedisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

// configurando tentativas 5 tentativa a cada 1s
const limiter = new RateLimiterRedis({
  storeClient: RedisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
  blockDuration: 15,
});

// segurança dados contra ataque
export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many reqyests', 429);
  }
}
