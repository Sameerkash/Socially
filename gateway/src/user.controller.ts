import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { request } from 'http';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { CreateUserDto, IUser } from './interfaces/user/user.interface';

@Controller('users')
export class UserService {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

}
