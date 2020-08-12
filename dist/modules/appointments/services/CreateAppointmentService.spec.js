"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fake/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// teste unitáro
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let createAppointment;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  }); // teste de criação de agendamento

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'userLogged',
      provider_id: 'provider-id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  }); // testa criação de agendamento no mesma data e horario

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 12, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'userLogged',
      provider_id: '12321312'
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'userLogged',
      provider_id: '12321312'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'userLogged',
      provider_id: '12321312'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as proider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'userLogged',
      provider_id: 'userLogged'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'userLogged',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'userLogged',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});