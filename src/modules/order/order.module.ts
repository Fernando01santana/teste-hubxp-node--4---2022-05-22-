import { Logger, Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { Ticket } from '../event/entities/ticket.entity';
import { Order } from './entities/order.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../event/entities/event.entity';
@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Ticket, Order, User, Event])],
  providers: [OrderService, Order, Ticket, User, Logger, Event],
  exports: [Logger],
})
export class OrderModule {}
