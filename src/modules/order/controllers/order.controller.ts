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
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { GetUser } from 'src/modules/auth/middlewares/get-userDecorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  create(
    @GetUser()
    @Body(ValidationPipe)
    createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/list')
  @UseGuards(AuthGuard('jwt'))
  list() {
    return this.orderService.listAll();
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  delete(
    @GetUser()
    @Param('id', ValidationPipe)
    id: string,
  ) {
    return this.orderService.remove(id);
  }
}
