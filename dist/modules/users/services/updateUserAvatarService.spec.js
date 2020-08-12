"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _updateUserAvatarService = _interopRequireDefault(require("./updateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
let fakeUsersRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatar = new _updateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  }); // teste de update avatar usuario

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpeg'
    });
    expect(user.avatar).toBe('avatar.jpeg');
  });
  it('should not be able to update avatar with from non existing user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'none-exist-user',
      avatarFilename: 'avatar.jpeg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when updating new one', async () => {
    // verifica se a função foi disparada
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpeg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpeg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpeg');
    expect(user.avatar).toBe('avatar2.jpeg');
  });
});