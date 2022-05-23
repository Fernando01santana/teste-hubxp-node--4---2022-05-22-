import { Body, Controller,Get, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('/login')
    async login(@Body(ValidationPipe) login:LoginDto){
        const loginToken = await this.authService.singIn(login)
        return loginToken
    }
}
