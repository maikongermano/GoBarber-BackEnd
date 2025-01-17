import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

// index, show, create, update, delete 5 metodo que deve ter um controller
export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
