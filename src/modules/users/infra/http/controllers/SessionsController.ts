import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer'; // aplicar metodos

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// index, show, create, update, delete 5 metodo que deve ter um controller
export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
