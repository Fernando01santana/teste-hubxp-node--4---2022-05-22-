import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Ticket } from './ticket.entity';

export enum TypeEvent {
  COMPANIES = 'companies',
  UNIVERSITIES = 'universities',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  attraction: string;

  @Column({ type: 'enum', enum: TypeEvent, default: TypeEvent.COMPANIES })
  type: TypeEvent;

  @Column()
  date: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  ticket: Ticket[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
