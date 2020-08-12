"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  }); // teste de update  usuario

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br'
    });
    expect(updatedUser.name).toBe('Teste 2');
    expect(updatedUser.email).toBe('teste2@teste.com.br');
  }); // tente exibir usario que nao existe

  it('should not be able show update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Test',
      email: 'exemplo@exemplo.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // teste de update  usuario com email que ja existe

  it('should not be able to change to another user email ', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'testeprincipal@teste.com',
      password: '123465'
    });
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'testeprincipal@teste.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // teste de update  usuario com senha antiga informada e nova senha

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      old_password: '123465',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  }); // teste de update  usuario  nao informo senha antiga

  it('should not be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // teste de update  usuario  nao informo senha antiga mas senha errada

  it('should not be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});