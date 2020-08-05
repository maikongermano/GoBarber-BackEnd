import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; // importa entidade do bando de dados

import User from '@modules/users/infra/typeorm/entities/User';

/**
 * Omit: função do TypeScript para dados, primeiro parametro são os tipos de dados
 * e o segundo a variavel que quer omitir da criação
 * Entity: utilizado para fazer as alteração no banco de dados
 */

// class responsavel pelos tipo de dados do repostiorio
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // relacionamento varios provider para um usuário
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  // relacionamento varios agendamento para um usuário
  // eager true tras os dados do join tbm
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
