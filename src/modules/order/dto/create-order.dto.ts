import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TypeTicket } from 'src/modules/event/entities/ticket.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsArray()
  typeTicket: TypeTicket;

  @IsNotEmpty()
  @IsNumber()
  quantity_ticket: Number;
}
