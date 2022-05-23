import { IsEmail, IsNotEmpty,IsArray, IsString, IsDate, IsNumber, IsObject } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { TypeEvent } from '../entities/event.entity';
import { TicketEvent } from './ticket-event.dto';
export class CreateEventDtoValidator {

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    attraction:string

    @IsString()
    @IsNotEmpty()
    date:string

    @IsObject()
    ticket:TicketEvent

    @IsNotEmpty()
    @IsArray()
    type:TypeEvent;
}
