import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no decoradas
      transform: true, // Transforma automáticamente los payloads
      forbidNonWhitelisted: true, // Rechaza propiedades no permitidas
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
