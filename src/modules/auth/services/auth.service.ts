import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import AppError from 'src/utils/AppError';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private UserRepository:Repository<User>,
        private jwtService:JwtService
    ){}
    
    async singIn({email,password}:LoginDto){
    const user = await this.UserRepository.findOne({where:{email:email}})
        if(!user){
        throw new AppError("Usuario não encontrado!",404)
        }
    const passwordVerify = await compare(password,user.password)

    if(!user || !passwordVerify){
        throw new AppError("Email ou senha invalido!",409)
    }

    const jwtPayload = {
        id:user.id
    }

    const token = await this.jwtService.sign(jwtPayload)
    return {user:user,token:token}
    }
}
