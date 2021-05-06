import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './products/interceptor/logging.interceptor';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
require('dotenv').config({ path: __dirname + '/../config.env' });

// import * as csurf from 'csurf';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    // app.use(csurf());
    app.enableCors();
    app.use(cookieParser());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(9000);
}
bootstrap();
