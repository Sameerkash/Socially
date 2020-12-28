import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions: ClientOptions = {
          options: { host: '127.0.0.1', port: 8003 },
          transport: Transport.TCP,
        };
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
