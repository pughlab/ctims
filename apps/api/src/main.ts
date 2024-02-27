/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {INestApplication, Logger} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  let origin = process.env.CTIMS_ENV === 'development' ? '*' : 'https://apps.ctims.ca';
  app.enableCors({origin})

  if (process.env.CTIMS_ENV === 'development') {
    setupSwagger(app);
  }

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('CTIMS API')
    .setDescription('The API for CTIMS backend.')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'KeycloakPasswordGuard')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/api-json',
  });
}

bootstrap();
