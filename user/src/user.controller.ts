import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import {
  IUserCreateDto,
  IUserCreateResponse,
} from './interfaces/user.interface';
import { User } from './schema/user.schema';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) // @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
  {}

  @MessagePattern('create_user')
  public async createUser(user: IUserCreateDto): Promise<IUserCreateResponse> {
    const usreResponse: User = await this.userService.createUser(user);

    // if (usreResponse.status !== HttpStatus.CREATED) {
    //   throw new HttpException(
    //     {
    //       message: createUserResponse.message,
    //       data: null,
    //       errors: createUserResponse.errors,
    //     },
    //     createUserResponse.status,
    //   );
    // }
    return {
      status: HttpStatus.CREATED,
      message: 'user_create_success',
      user: usreResponse,
      errors: null,
    };
  }
}
