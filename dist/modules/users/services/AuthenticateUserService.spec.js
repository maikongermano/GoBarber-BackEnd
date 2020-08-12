"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
let fakeUsersRepository;
let fakeHashProvider;
let authenticadeUser;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticadeUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  }); // teste de aunteticação de usuario

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456'
    });
    const response = await authenticadeUser.execute({
      email: 'teste@teste.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  }); // verifica autenticação de usuario que nao existe

  it('should not be able to authenticate whith non existing user', async () => {
    await expect(authenticadeUser.execute({
      email: 'teste@teste.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // teste de aunteticação de usuario com senha errada

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456'
    });
    await expect(authenticadeUser.execute({
      email: 'teste@teste.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});