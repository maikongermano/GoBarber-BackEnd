interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

// serviço de email
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'maikongermano@gmail.com',
      name: 'Maikon Germano',
    },
  },
} as IMailConfig;
