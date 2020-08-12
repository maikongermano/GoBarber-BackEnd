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

let ListProviderWithAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderWithAvailabilityService {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    provider_id,
    year,
    month
  }) {
    // retorna todos os agendamento do mes
    const appointments = await this.appointmentsRepository.findAllInMounthFromProvider({
      provider_id,
      year,
      month
    }); // numero de dias do mes

    const numberOfDaysInMonth = (0, _dateFns.getDaysInMonth)(new Date(year, month - 1)); // construção do array de todos os dia do mes

    const eachDayArray = Array.from({
      length: numberOfDaysInMonth
    }, (_, index) => index + 1); // percorrer array para verificar se existe agendamento disponivel no dia selecionado

    const availability = eachDayArray.map(day => {
      // ultimo horario do dia
      const compareData = new Date(year, month - 1, day, 23, 59, 59);
      const appointmentsInDay = appointments.filter(appointment => {
        return (0, _dateFns.getDate)(appointment.date) === day;
      }); // 10 agendamentos no dia (8h até as 17h) um a cada hora

      return {
        day,
        available: // data é depois de agora retorna disponivel
        (0, _dateFns.isAfter)(new Date(), compareData) && appointmentsInDay.length < 10
      };
    });
    return availability;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProviderWithAvailabilityService;
exports.default = _default;