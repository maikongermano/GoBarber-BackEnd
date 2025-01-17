// teste unitáro
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  // teste de criação de usuario
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Exemplo',
      email: 'exemplo@exemplo.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  // verifica usuario com m esmo email
  it('should not be able to create a new user whith same email from another', async () => {
    await createUser.execute({
      name: 'Exemplo',
      email: 'exemplo@exemplo.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Exemplo',
        email: 'exemplo@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
