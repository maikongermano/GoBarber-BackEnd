"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  }); // teste de criação de usuario

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Exemplo',
      email: 'exemplo@exemplo.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  }); // verifica usuario com m esmo email

  it('should not be able to create a new user whith same email from another', async () => {
    await createUser.execute({
      name: 'Exemplo',
      email: 'exemplo@exemplo.com',
      password: '123456'
    });
    await expect(createUser.execute({
      name: 'Exemplo',
      email: 'exemplo@exemplo.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});