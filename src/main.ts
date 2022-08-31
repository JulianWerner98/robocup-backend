import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";
import {VersioningType} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = app.get(ConfigService).get<number>('PORT')

  app.enableVersioning({type: VersioningType.URI})
  app.setGlobalPrefix('api')

  // Swagger
  const options = new DocumentBuilder()
      .setTitle('RoboCup Backend')
      .setDescription('The ngCompanion API description.')
      .setVersion('1.0')
      .addTag('companions')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //Start
  await app.listen(port);
}
bootstrap();
