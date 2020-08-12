"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointments = _interopRequireDefault(require("../entities/Appointments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class responsavel pelo repositorio e metodos
class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointments.default);
  } // retorna validação de data


  async findByDate(date, provider_id) {
    // variavel que percorre validação de data
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    });
    return findAppointment;
  }

  async findAllInMounthFromProvider({
    provider_id,
    month,
    year
  }) {
    // se for 1 casa decimal padstart adicona zero a esquerda -> 01
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async findAllInDayProvider({
    provider_id,
    day,
    month,
    year
  }) {
    // se for 1 casa decimal padstart adicona zero a esquerda -> 01
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      },
      relations: ['user'] // trans os usuarios

    });
    return appointments;
  }

  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;