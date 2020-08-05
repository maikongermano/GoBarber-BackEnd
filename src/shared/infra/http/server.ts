import 'reflect-metadata';
import 'dotenv/config'; // variaveis de ambiente

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // evita acesso indevido
import 'express-async-errors';
import { errors } from 'celebrate'; // mensagem de validação
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm'; // conecta com o arquivo para fazer conexao do banco de dados
import '@shared/container'; // carrega dependencias

const app = express();

app.use(cors());

app.use(express.json());

// rota estatica para exibir arquivo
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(rateLimiter); // segurança limite de requisições

app.use(routes);

app.use(errors()); // erros na validação das rotas

// tratativas de erros na rota
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // se for um erro conhecido faço uma mensagem melhor para o front
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // eslint-disable-next-line no-console
  console.log(err);
  // erro inesperado
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server starded on port 3333!');
});
