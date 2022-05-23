import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty,IsString,IsArray } from 'class-validator';
import { LevelUser } from '../entities/user.entity';


export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @IsEmail()
    email:string; 

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsArray()
    level_acess: LevelUser;
}
