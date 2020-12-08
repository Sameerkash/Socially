import { CanActivate, ExecutionContext, HttpException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKEN_SERVICE') private readonly authTokenService: ClientProxy,
  ) {}


  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>('secured', context.getHandler());

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await this.authTokenService.send('token_decode', {
      token: request.headers.authorization
    }).toPromise();

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException({
        message: userTokenInfo.message,
        data: null,
        errors: null
      }, userTokenInfo.status);
    }
    return true;
}
}
