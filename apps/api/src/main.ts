/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {INestApplication, Logger} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const allowedOrigins = [
    'https://ctims.uhn.ca',
    'https://pmatch.uhn.ca',
    ];
  // let origin = process.env.CTIMS_ENV === 'development' ? '*' : 'https://ctims.ca';
  // app.enableCors({origin})
  app.enableCors({
    origin: (origin, callback) => {
      Logger.log(`Origin: ${origin}`);
      if (process.env.CTIMS_ENV === 'development') {
        Logger.log('CORS enabled for development environment');
        callback(null, true); // Allow all origins in development
      } else if (!origin || allowedOrigins.includes(origin)) {
        Logger.log(`CORS allowed for origin: ${origin}`);
        callback(null, true); // Allow if origin is in the list
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  });
  if (process.env.CTIMS_ENV === 'development') {
    setupSwagger(app);
  }

  app.use(bodyParser.json({limit: '200mb'}));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

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
