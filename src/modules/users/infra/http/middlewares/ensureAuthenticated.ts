import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authconfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// função middleware para verificação de usuario auntenticado
export default function ensureAuthenticade(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Bearer saudihis

  const [, token] = authHeader.split(' ');

  // segundo parametro secret que geramos no arquivo authconfig
  try {
    const decoded = verify(token, authconfig.jwt.secret);

    const { sub } = decoded as tokenPayload; // as força o tipo da variavel com a interface

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
