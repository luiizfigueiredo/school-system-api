import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envValues } from './shared/env-values';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(envValues.PORT);
}
void bootstrap();
