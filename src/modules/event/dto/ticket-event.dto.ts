import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Ticket, TypeTicket } from "../entities/ticket.entity"

export class TicketEvent{
    @IsNotEmpty()
    @IsNumber()
    value:Number

    @IsNotEmpty()
    @IsNumber()
    quantity_ticket:Number

    @IsEnum(Ticket)
    @IsNotEmpty()
    type_ticket:TypeTicket[]
}