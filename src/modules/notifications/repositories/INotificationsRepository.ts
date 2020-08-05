import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

// interface de repository
export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
