import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './products/interceptor/logging.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(9000);
}
bootstrap();
