import { Logger,Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Event} from '../event/entities/event.entity'
import { Ticket, TypeTicket } from './entities/ticket.entity';

@Module({
  controllers: [EventController],
  imports:[TypeOrmModule.forFeature([Event,Ticket])],
  providers: [EventService,Event,Ticket,Logger],
  exports:[Logger]
})
export class EventModule {}
