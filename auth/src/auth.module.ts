import { Module } from '@nestjs/common';
import { JwtConfigService } from './services/config/jwt-config.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './services/config/mongo-config.service';
import { AuthTokenSchema } from './schema/authToken.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Token',
        schema: AuthTokenSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
