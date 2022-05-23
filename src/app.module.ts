import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/users.module';
import { EventModule } from './modules/event/event.module';
import { typeOrmConfig } from './config/database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';


@Module({
  imports: [UsersModule, EventModule,OrderModule,TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
  controllers: [],
  providers:[],
})
export class AppModule {}
