import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // setup swagger
  const config = new DocumentBuilder()
  .setTitle("AirBnB")
  .addBearerAuth()
  .setDescription("Danh sách các API về AirBnB")
  .setVersion("1.0")
  .build()

  const swagger = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, swagger)

  await app.listen(3000);
}
bootstrap();


// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()