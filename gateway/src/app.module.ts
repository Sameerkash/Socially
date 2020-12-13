import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
// import { AppController } from './app.controller';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
