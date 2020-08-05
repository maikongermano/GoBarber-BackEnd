# Recuperação de senha

**RF(Requisito funcional)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF(Requisito não funcional)**

- Utilizar Ethereal para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontencer em segundo plano (background job);

**RN(Regra de negocio)**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisar confirmar a nova senha ao resetar sua senha;


# Atualização do perfil

**RF(Requisito funcional)**

- O usuário deve poder atualizar seu nome, email e senha;

**RN(Regra de negocio)**

- O usuário não pode alterar seu email, para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisar confirmar sua senha atual;

# Painel do prestador

**RF(Requisito funcional)**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF(Requisito não funcional)**

- Os agendamentos do prestador no dia deve ser armzenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviados em tempo-real utilizando Sokect.io;

**RN(Regra de negocio)**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF(Requisito funcional)**

- O usuário deve poder listar todos os prestadores de serviço cadastrado;
- O usário deve poder listar os dias de um mês com pelo menos horário disponível de um prestador;
- O usário deve poder listar horários disponível em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF(Requisito não funcional)**

- A listagem de prestadores deve ser armazeada em cache;

**RN(Regra de negocio)**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, Último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviço consigo mesmo;

