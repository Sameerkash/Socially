import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  IUserCreateResponse,
} from './interfaces/user/user.interface';

@Controller('users')
export class UserController {
  constructor(
    // @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post('create')
  public async createUser(
    @Body() user: CreateUserDto,
  ): Promise<IUserCreateResponse> {
    const userResposne: IUserCreateResponse = await this.userService
      .send('create_user', user)
      .toPromise();

    return userResposne;
  }
}
