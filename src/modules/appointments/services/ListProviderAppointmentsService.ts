import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppontimentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cachekey = `provider-appointments:${provider_id}-${year}-${month}-${day}`;
    // buscando no cache no redis
    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cachekey,
    );

    if (!appointments) {
      // busca os agendamentos postgres
      appointments = await this.appointmentsRepository.findAllInDayProvider({
        provider_id,
        year,
        month,
        day,
      });

      // salvando em cache
      await this.cacheProvider.save(cachekey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppontimentsService;
