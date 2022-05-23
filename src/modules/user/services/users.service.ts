import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/utils/AppError';
import { Repository } from 'typeorm';
import { CreateUserDtoValidator } from '../dto/create-user-validator.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LevelUser, User } from '../entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDtoValidator): Promise<User> {
    const { email, level_acess, password, passwordConfirm, username } =
      createUserDto;

    const userVerify = await this.UserRepository.findOne({
      where: { email: email },
    });

    if (userVerify) {
      this.logger.error('Email ja cadastrado');
      throw new AppError('Email ja cadastrado', 409);
    }
    if (password !== passwordConfirm) {
      this.logger.error(
        'Senhas informadas para cadastro de usuario não identicas',
      );
      throw new AppError('As senhas não identicas', 409);
    }

    const levelAcessVerify = this.searchLevelCess(level_acess, 'create');
    if (!levelAcessVerify) {
      throw new AppError('Nivel de acesso informado não existe!', 404);
    }
    const passwordHashed = await hash(password, 8);
    const passwordHashed2 = await hash(password, 8);

    const user = await this.UserRepository.create({
      email: email,
      level_acess: levelAcessVerify,
      password: passwordHashed,
      username: username,
    });
    try {
      await this.UserRepository.save(user);
      this.logger.log('Usuario criado');
      return user;
    } catch (error) {
      throw new AppError('Erro ao salvar usuario', 409);
    }
  }

  async findAll() {
    this.logger.log('Dados de todos os usuarios recuperados');
    return await this.UserRepository.find();
  }

  async findOne(id: string) {
    const user = await this.UserRepository.find({
      where: { id: id },
    });
    if (!user) {
      this.logger.error(`Erro ao buscar um unico usuario: `);
      throw new AppError('Usuario não encontrado', 404);
    }
    this.logger.log('Dados de usuario recuperado');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userVerify = await this.UserRepository.findOne({ where: { id: id } });
    if (!userVerify) {
      throw new AppError('Usuario não encontrado', 403);
    }
    const levelAcessVerify = this.searchLevelCess(
      updateUserDto.level_acess,
      'update',
    );

    userVerify.email = updateUserDto.email;
    userVerify.level_acess = levelAcessVerify;
    userVerify.username = updateUserDto.username;
    this.UserRepository.save(userVerify);
    this.logger.log('Dados de usuario atualizado');
    return userVerify;
  }

  async remove(id: string) {
    const user = await this.UserRepository.findOne(id);
    if (!user) {
      throw new AppError('Nenhum usuario encontrado', 404);
    }
    const userDeleted = await this.UserRepository.remove(user);
    this.logger.log('Usuario deletado');
    return { message: 'Usuario deletado' };
  }

  searchLevelCess(level_acess, operation) {
    let acessLevelSave = null;
    for (const key in LevelUser) {
      if (Object.prototype.hasOwnProperty.call(LevelUser, key)) {
        const element = LevelUser[key];
        if (operation === 'create') {
          if (element === level_acess[0]) {
            acessLevelSave = element;
          }
        } else if (operation === 'update') {
          if (element === level_acess[0]) {
            acessLevelSave = element;
          }
        }
      }
    }
    return acessLevelSave;
  }
}
