import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
}

bootstrap();
