import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { BlogModule } from './blog/blog.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        ProductsModule,
        GraphQLModule.forRoot({ autoSchemaFile: true }),
        BlogModule,
    ],
})
export class AppModule {}
