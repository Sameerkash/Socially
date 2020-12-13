import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UserService],
})
export class UserModule {}
