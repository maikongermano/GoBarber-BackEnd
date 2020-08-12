"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderDayAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderDayAvailabilityService {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    provider_id,
    year,
    month,
    day
  }) {
    // retorna os agedamentos
    const appointments = await this.appointmentsRepository.findAllInDayProvider({
      provider_id,
      year,
      month,
      day
    }); // primeira hora do dia que começa o agendamento

    const hourStart = 8; // array das horas para o agendamento com 10 agendamentos iniciando as 8h

    const eachHourArray = Array.from({
      length: 10
    }, (_, index) => index + hourStart); // data Atual

    const currentDate = new Date(Date.now()); // array com as horas disponivel ou não disponivel

    const availability = eachHourArray.map(hour => {
      // procura se tem agendamento na hora ou não
      const hasAppointmentInHour = appointments.find(appointment => (0, _dateFns.getHours)(appointment.date) === hour); // data do agendamento

      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !hasAppointmentInHour && (0, _dateFns.isAfter)(compareDate, currentDate)
      };
    });
    return availability;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProviderDayAvailabilityService;
exports.default = _default;