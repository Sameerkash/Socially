import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
// import { AppController } from './app.controller';
import { ConfigService } from './services/app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService,
  {
    provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('tokenService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [
        ConfigService
      ]
  }
  ],
})
export class AppModule {}
