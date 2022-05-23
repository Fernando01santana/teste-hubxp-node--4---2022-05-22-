import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-34-192-210-139.compute-1.amazonaws.com',
  port: 5432,
  username: 'senyuxycwhesni',
  password: '18cfdf0418b4d1661701143b7f5b210e0e25c81b5efa0e068cc4c3cc79106667',
  database: 'd43hel2m4lmv27',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
