import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 
  8000;
  // app.get('ConfigService').get('port');
  await app.listen(port, () => {
    logger.log(`gateway is listenting on port ${port}`);
  });
}
bootstrap();
