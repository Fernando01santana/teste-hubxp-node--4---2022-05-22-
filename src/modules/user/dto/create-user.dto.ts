import { IsEmail, IsNotEmpty,IsArray } from 'class-validator';
import { LevelUser } from '../entities/user.entity';
export class CreateUserDto {

    @IsNotEmpty()
    username:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsArray()
    level_acess:LevelUser;

    @IsNotEmpty()
    password:string;

}
