import { IsEmail, IsNotEmpty,IsArray } from 'class-validator';
import { LevelUser } from '../entities/user.entity';
export class CreateUserDtoValidator {

    @IsNotEmpty()
    username:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsArray()
    level_acess:LevelUser;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    passwordConfirm:string;
}
