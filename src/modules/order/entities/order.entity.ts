import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Ticket } from '../../event/entities/ticket.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Ticket, (ticket) => ticket.order)
  ticket: Ticket[];

  @Column()
  quantity_ticket: Number;

  @ManyToOne(() => User, (user) => user.order, { onDelete: 'CASCADE' })
  user: User;
}
