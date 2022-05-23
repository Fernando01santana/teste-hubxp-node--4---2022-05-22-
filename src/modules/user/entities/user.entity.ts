import { Order } from '../../order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum LevelUser {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  username: string;

  @Column('text')
  email: string;

  @Column({ type: 'enum', enum: LevelUser, default: LevelUser.CUSTOMER })
  level_acess: LevelUser;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
