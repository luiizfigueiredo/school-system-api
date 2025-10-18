import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envValues } from './shared/env-values';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envValues.PORT, () => {
    console.log(`Server is running on ${envValues.PORT}`);
  });
}
bootstrap();
