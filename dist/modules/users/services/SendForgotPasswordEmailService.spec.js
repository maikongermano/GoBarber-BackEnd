"use strict";

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  // cria as antes dos teste
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  }); // teste de recuperação de senha pelo email

  it('should be able recover the password using the email', async () => {
    // verifica se a funcao foi disparada
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '1234656'
    });
    await sendForgotPasswordEmail.execute({
      email: 'teste@teste.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'teste@teste.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password toke', async () => {
    // verifica se a funcao foi disparada
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '1234656'
    });
    await sendForgotPasswordEmail.execute({
      email: 'teste@teste.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});