import 'reflect-metadata';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/utils/AppError';
import { Repository } from 'typeorm';
import { CreateEventDtoValidator } from '../dto/create-event.dto-validator';
import { Event, TypeEvent } from '../entities/event.entity';
import { Ticket, TypeTicket } from '../entities/ticket.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class EventService {
  private logger: Logger = new Logger();

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}
  async create(createEventDto: CreateEventDtoValidator): Promise<Event> {
    const { attraction, date, name, type, ticket } = createEventDto;
    const eventVerify = await this.eventRepository.findOne({
      where: { name: name },
    });

    if (eventVerify) {
      this.logger.log('Evento com esse nome ja cadastrado');
      throw new AppError('Event com esse nome ja cadastrado!', 409);
    }
    if (!ticket.type_ticket || ticket.type_ticket[0] === null) {
      throw new AppError('tipo de ingresso não informado!', 404);
    }
    try {
      const eventCreate = this.eventRepository.create({
        attraction: attraction,
        name: name,
        date: this.dateTransform(date),
        type: this.searchTypeEvent(type),
        ticket: null,
      });

      await this.eventRepository.save(eventCreate);
      const arrayTicket = [];
      for (let i = 0; i < ticket.type_ticket.length; i++) {
        const element = ticket.type_ticket[i];
        const ticketCreate = this.ticketRepository.create({
          event: eventCreate,
          quantity_ticket: ticket.quantity_ticket,
          type_ticket: this.searchTypeTicket(ticket.type_ticket[i]),
          value_ticket: ticket.value,
        });
        arrayTicket.push(ticketCreate);
        await this.ticketRepository.save(ticketCreate);
      }
      eventCreate.ticket = arrayTicket;
      await this.eventRepository.save(eventCreate);

      this.logger.log('Evento criado com sucesso!');
      return eventCreate;
    } catch (error) {
      this.logger.log('Erro ao salvar evento:', error);
      console.log(error);
      throw new AppError('Erro ao salvar evento', 409);
    }
  }

  async findAll() {
    const events = await this.eventRepository.find();
    if (!events) {
      throw new AppError('Nenhum evento encontrado1', 404);
    }
    return events;
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    return event;
  }

  async remove(id: string) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new AppError('Nenhum evento encontrado', 404);
    }
    const eventDeleted = await this.eventRepository.remove(event);
    return eventDeleted;
  }

  dateTransform(date) {
    const dateParse = date.split('/');
    const dateFormatter =
      dateParse[1] + '-' + dateParse[0] + '-' + dateParse[2];
    return dateFormatter;
  }

  searchTypeEvent(type_event) {
    let typeEvent = null;
    for (const key in TypeEvent) {
      if (Object.prototype.hasOwnProperty.call(TypeEvent, key)) {
        const element = TypeEvent[key];
        if (element === type_event[0]) {
          typeEvent = element;
        }
      }
    }
    return typeEvent;
  }

  searchTypeTicket(type_ticket) {
    let typeTycket = null;
    for (const key in TypeTicket) {
      if (Object.prototype.hasOwnProperty.call(TypeTicket, key)) {
        const element = TypeTicket[key];
        if (element === type_ticket) {
          typeTycket = element;
        }
      }
    }
    return typeTycket;
  }
}
