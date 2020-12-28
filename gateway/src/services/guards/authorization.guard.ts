import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     @Inject('TOKEN_SERVICE') private readonly authTokenService: ClientProxy,
//   ) {}
// }
