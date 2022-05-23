import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelUser, User } from '../../../user/entities/user.entity';
import { Repository } from 'typeorm';
import AppError from 'src/utils/AppError';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: { id: number }) {
    const { id } = payload;
    const user = await this.userRepository.findOne({where:{id:id}});
    if (!user) {
      throw new AppError("Usuario não encontrado!",403)
    }

    if(user.level_acess !== LevelUser.ADMIN){
        throw new AppError("Apenas administradores podem acessar este recurso")
    }

    return user;
  }
}