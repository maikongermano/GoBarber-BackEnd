import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    // retorna os agedamentos
    const appointments = await this.appointmentsRepository.findAllInDayProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    // primeira hora do dia que começa o agendamento
    const hourStart = 8;

    // array das horas para o agendamento com 10 agendamentos iniciando as 8h
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    // data Atual
    const currentDate = new Date(Date.now());

    // array com as horas disponivel ou não disponivel
    const availability = eachHourArray.map(hour => {
      // procura se tem agendamento na hora ou não
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      // data do agendamento
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
