import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IUserCreateDto,
  IUserCreateResponse,
} from './interfaces/user.interface';
import { User } from './schema/user.schema';
import { UserService } from './services/user.service';

/**
 * UserController .
 *
 *
 */
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, // @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
  ) {}

  /**
   * Handles incoming requests to create a new user in database.
   *
   * @param user
   *
   * @returns errors - 'user_create_bad_request' if incoming fields are missing
   * @returns errors - 'user_create_conflict' if email already exists
   * @returns result  - 'user_create_success' if none of condtitons above are met
   *
   */
  @MessagePattern('create_user')
  public async createUser(user: IUserCreateDto): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse;

    if (!user.email || !user.name || !user.password) {
      return (result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_create_bad_request',
        user: null,
        errors: null,
      });
    }

    const usersWithEmail = await this.userService.searchUser({
      email: user.email,
    });

    if (usersWithEmail && usersWithEmail.length > 0) {
      result = {
        status: HttpStatus.CONFLICT,
        message: 'user_create_conflict',
        user: null,
        errors: {
          email: {
            message: 'Email already exists',
            path: 'email',
          },
        },
      };
    } else {
      try {
        user.verified = false;
        const usreResponse: User = await this.userService.createUser(user);

        result = {
          status: HttpStatus.CREATED,
          message: 'user_create_success',
          user: usreResponse,
          errors: null,
        };
      } catch (error) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'user_create_precondition_failed',
          user: null,
          errors: error.errors,
        };
      }
    }

    return result;
  }
}
