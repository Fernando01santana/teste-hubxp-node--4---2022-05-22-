import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDtoValidator } from '../dto/create-event.dto-validator';
import { GetUser } from 'src/modules/auth/middlewares/get-userDecorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/create')
  async create(@Body(ValidationPipe) createEventDto: CreateEventDtoValidator) {
    const event = await this.eventService.create(createEventDto);
    return event;
  }

  @Get('/list/all')
  async list() {
    const events = await this.eventService.findAll();
    return events;
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@GetUser() @Param('id') id: string) {
    const eventDeleted = await this.eventService.remove(id);
    return eventDeleted;
  }

  @Get('/list/one/:id')
  @UseGuards(AuthGuard('jwt'))
  async detail(@GetUser() @Param('id') id: string) {
    const event = await this.eventService.findOne(id);
    return event;
  }
}
