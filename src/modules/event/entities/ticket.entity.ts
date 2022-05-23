import 'reflect-metadata';
import { Order } from '../../order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../event/entities/event.entity';

export enum TypeTicket {
  INTEGER = 'integer',
  HALF_PRICE = 'half_price',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value_ticket: number;

  @Column()
  quantity_ticket: number;

  @Column({ type: 'enum', enum: TypeTicket, default: TypeTicket.INTEGER })
  type_ticket: TypeTicket;

  @ManyToOne(() => Event, (event) => event.ticket)
  event: Event;

  @ManyToOne(() => Order, (order) => order.ticket, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
