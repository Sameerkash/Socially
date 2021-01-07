import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { ConfigService } from './services/config/config.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
