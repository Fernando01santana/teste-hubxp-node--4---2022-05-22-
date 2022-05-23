import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDtoValidator } from '../dto/create-user-validator.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/middlewares/get-userDecorator';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() createUserDtoValidator: CreateUserDtoValidator) {
    const user = await this.usersService.create(createUserDtoValidator);
    return user;
  }

  @Get('/list')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@GetUser() user: User[]): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get('/list/one/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@GetUser() @Param('id', ValidationPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @GetUser()
    @Param('id', ValidationPipe)
    id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@GetUser() @Param('id', ValidationPipe) id: string) {
    return this.usersService.remove(id);
  }
}
