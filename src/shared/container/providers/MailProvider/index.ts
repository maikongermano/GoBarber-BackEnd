// mapeamento entro os provider
import { container } from 'tsyringe';
import mailconfig from '@config/mail';
import IEmailProvider from './models/IEmailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IEmailProvider>(
  'MailProvider',
  providers[mailconfig.driver],
);
