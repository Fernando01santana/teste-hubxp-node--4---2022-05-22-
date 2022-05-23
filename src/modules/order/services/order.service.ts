import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket, TypeTicket } from 'src/modules/event/entities/ticket.entity';
import { User } from 'src/modules/user/entities/user.entity';
import AppError from 'src/utils/AppError';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { Event } from '../../event/entities/event.entity';

@Injectable()
export class OrderService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Event)
    private eventRepositorie: Repository<Event>,
    @InjectRepository(User)
    private userRepositorie: Repository<User>,
    @InjectRepository(Ticket)
    private ticketRepositorie: Repository<Ticket>,
    @InjectRepository(Order)
    private orderRepositorie: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<any> {
    const { eventId, quantity_ticket, typeTicket, userId } = createOrderDto;
    const userVerify = await this.userRepositorie.findOne(userId);
    if (!userVerify) {
      throw new AppError('Usuario não encontrado!', 404);
    }

    const event = await this.eventRepositorie.findOne(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado!', 404);
    }

    const ticket = await this.ticketRepositorie.find({
      where: { event: event },
    });
    if (!ticket) {
      throw new AppError(
        'Ainda não tem ingressos a venda para este evento!',
        404,
      );
    }
    let order = null;
    const orderdata = {
      ticketId: null,
      value: null,
      typeTicket: null,
      event: null,
      customer: null,
      quantity: null,
      orderId: null,
    };
    for (let i = 0; i < ticket.length; i++) {
      const element = ticket[i];
      if (element.quantity_ticket < Number(quantity_ticket)) {
        throw new AppError(
          'Quantidade de ingressos selecionada indisponivel',
          409,
        );
      }

      if (element.type_ticket === this.searchTypeTicket(typeTicket)) {
        const newQuantityTicket =
          Number(element.quantity_ticket) - Number(quantity_ticket);
        element.quantity_ticket = newQuantityTicket;
        await this.ticketRepositorie.save(element);

        order = this.orderRepositorie.create({
          ticket: [element],
          user: userVerify,
          quantity_ticket: createOrderDto.quantity_ticket,
        });
        await this.orderRepositorie.save(order);
        (orderdata.event = event.name),
          (orderdata.ticketId = element.id),
          (orderdata.typeTicket = element.type_ticket),
          (orderdata.value = element.value_ticket);
        orderdata.customer = userVerify.username;
        orderdata.quantity = createOrderDto.quantity_ticket;
        orderdata.orderId = order.id;
      }
    }

    return orderdata;
  }

  async remove(id: string) {
    const order = await this.orderRepositorie.find({ id: id });
    if (!order) {
      throw new AppError('Ordem de compra não encontrada', 404);
    }
    await this.orderRepositorie.remove(order);
    return { message: 'ordem de compra deletada', status: 200 };
  }

  searchTypeTicket(type_ticket) {
    let typeTycket = null;
    for (const key in TypeTicket) {
      if (Object.prototype.hasOwnProperty.call(TypeTicket, key)) {
        const element = TypeTicket[key];
        if (element === type_ticket[0]) {
          typeTycket = element;
        }
      }
    }
    return typeTycket;
  }

  async listAll() {
    const orders = await this.orderRepositorie.find({
      relations: ['ticket', 'user'],
    });
    return orders;
  }
}
