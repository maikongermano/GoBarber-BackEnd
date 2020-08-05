import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderWithAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    // retorna todos os agendamento do mes
    const appointments = await this.appointmentsRepository.findAllInMounthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    // numero de dias do mes
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // construção do array de todos os dia do mes
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    // percorrer array para verificar se existe agendamento disponivel no dia selecionado
    const availability = eachDayArray.map(day => {
      // ultimo horario do dia
      const compareData = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      // 10 agendamentos no dia (8h até as 17h) um a cada hora
      return {
        day,
        available:
          // data é depois de agora retorna disponivel
          isAfter(new Date(), compareData) && appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderWithAvailabilityService;
