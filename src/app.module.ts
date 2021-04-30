import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
require('dotenv').config({ path: __dirname + '/../config.env' });

@Module({
    imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig), ProductsModule],
})
export class AppModule {}
