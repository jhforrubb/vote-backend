import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Vote } from './vote/schema/vote.schema';
import { Campaign } from './campaign/schema/campaign.schema';
import { Option } from './option/schema/option.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Simple voting')
    .setDescription('The voting API description')
    .setVersion('1.0')
    .addTag('voting')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [Vote, Campaign, Option],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
