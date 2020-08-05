import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUsersAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // procura usuario passado
    const user = await this.usersRepository.findById(user_id);

    // se nao encontrou
    if (!user) {
      throw new AppError('Only authenticated users can chage avatar.', 401);
    }

    if (user.avatar) {
      // deletar avatar anterior
      await this.storageProvider.deleteFile(user.avatar);
    }

    // adicionado ou atualizando avatar
    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUsersAvatarService;
