import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {config} from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // setup swagger
  const configSwagger = new DocumentBuilder()
  .setTitle("AirBnB")
  .addBearerAuth()
  .setDescription("Danh sách các API về AirBnB")
  .setVersion("1.0")
  .build()

  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("swagger", app, swagger)

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  })

  await app.listen(3000);
}
bootstrap();


// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()