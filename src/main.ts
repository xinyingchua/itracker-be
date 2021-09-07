import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config'
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'
dotenv.config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true
  })

  app.use(cookieParser(process.env.JWT_TOKEN_SECRET));

  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port);
}
bootstrap();
