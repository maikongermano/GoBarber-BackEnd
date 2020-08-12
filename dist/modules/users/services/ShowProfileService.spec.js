"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
let fakeUsersRepository;
let showProfile;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  }); // teste de show  usuario

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('teste');
    expect(profile.email).toBe('teste@teste.com');
  }); // tente exibir usario que nao existe

  it('should not be able show the profile from non-existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non-existing-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});