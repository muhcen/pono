import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
require('dotenv').config({ path: __dirname + '/../config.env' });

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        MongooseModule.forRoot(process.env.DATA_BASE_URL_MONGODB),
        ProductsModule,
    ],
})
export class AppModule {}
