import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDtoValidator } from './create-event.dto-validator';

export class UpdateEventDto extends PartialType(CreateEventDtoValidator) {}
