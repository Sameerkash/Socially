import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationParams } from './interfaces/common/utils.interface';
import {
  CreateUserDto,
  UserCreateResponse,
  UsersResposne,
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
  ): Promise<UserCreateResponse> {
    const userResposne: UserCreateResponse = await this.userService
      .send('create_user', user)
      .toPromise();

    return userResposne;
  }

  @Get('all')
  public async fecthUsers(
    @Body() page: PaginationParams,
  ): Promise<UsersResposne> {
    const userResposne: UsersResposne = await this.userService
      .send('get_users', page)
      .toPromise();

    return userResposne;
  }
}
