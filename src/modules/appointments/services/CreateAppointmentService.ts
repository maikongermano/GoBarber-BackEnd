// arquivo responsavel pela criação do appointment.
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 * [X] Recebimento das informações
 * [X] Tratativa de erros/excessões
 * [X] Acesso ao repositório
 * [X] Dependency Inversion (SOLID)
 *
 * toda funão async await retorna uma promise
 */

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    const appontmentDate = startOfHour(date);

    // verifica se a data atual é antes de agora
    if (isBefore(appontmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appontmentDate) < 8 || getHours(appontmentDate) > 17) {
      throw new AppError(
        'You Can only create appointments between 8am and 5pm',
      );
    }

    const findAppointmenInSameDate = await this.appointmentsRepository.findByDate(
      appontmentDate,
      provider_id,
    );
    // validação de data
    if (findAppointmenInSameDate) {
      throw new AppError('This appoiment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appontmentDate,
    });

    // notificação de agendamento
    const dateFormatted = format(appontmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: provider_id,

      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    // invalidado cache
    await this.cacheProvider.invalidade(
      `provider-appointments:${provider_id}:${format(
        appontmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
