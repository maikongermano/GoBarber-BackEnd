"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
// import AppError from '@shared/errors/AppError';
let fakeUsersRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  }); // teste de show  provider com usuario logado

  it('should be able show to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123465'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'teste2',
      email: 'teste2@teste.com',
      password: '123465'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'teste3',
      email: 'teste3@teste.com',
      password: '123465'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});