import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Blog } from 'src/blog/blog.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'pono',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
    autoLoadEntities: true,
};
