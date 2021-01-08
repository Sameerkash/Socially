import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IUserCreateDto,
  IUserUpdateDto,
  UserCreateResponse,
  UserResponse,
  UsersResponse,
} from './interfaces/user.interface';
import { PaginationParams } from './interfaces/utils.interface';
import { User } from './schema/user.schema';
import { UserService } from './services/user.service';

/**
 * UserController
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
  public async createUser(user: IUserCreateDto): Promise<UserCreateResponse> {
    let result: UserCreateResponse;

    if (!user.email || !user.name || !user.password) {
      return (result = {
        user: null,
        result: {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: 'Invalid Paramters',
          },
          message: 'user_create_bad_request',
        },
      });
    }

    const usersWithEmail = await this.userService.searchUser({
      email: user.email,
    });

    if (usersWithEmail && usersWithEmail.length > 0) {
      result = {
        user: null,
        result: {
          status: HttpStatus.CONFLICT,
          message: 'user_create_conflict',
          errors: {
            email: {
              message: 'Email already exists',
              path: 'email',
            },
          },
        },
      };
    } else {
      try {
        user.verified = false;
        const usreResponse: User = await this.userService.createUser(user);

        result = {
          user: usreResponse,
          result: {
            status: HttpStatus.CREATED,
            message: 'user_create_success',
            errors: null,
          },
        };
      } catch (error) {
        result = {
          user: null,
          result: {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'user_create_precondition_failed',
            errors: error.errors,
          },
        };
      }
    }

    return result;
  }

  /**
   * getAllUsers
   *
   * @param page
   *
   * @returns first five users if no skip and take are specified
   * @returns  users within the specified range
   */
  @MessagePattern('get_users')
  public async getAllUsers(page: PaginationParams): Promise<UsersResponse> {
    let result: UsersResponse;
    try {
      if (!page.skip || !page.take) {
        const users: User[] = await this.userService.fecthAllUsers({
          skip: 0,
          take: 5,
        });
        return (result = {
          result: {
            status: HttpStatus.OK,
            errors: {
              messsage: 'Success, invalid params',
            },
            message: 'users_fetch_success',
          },
          users: users,
        });
      }

      const users: User[] = await this.userService.fecthAllUsers(page);

      result = {
        result: {
          status: HttpStatus.OK,
          errors: null,
          message: 'Success!',
        },
        users: users,
      };
    } catch (error) {
      result = {
        result: {
          status: HttpStatus.PRECONDITION_FAILED,
          errors: {
            message: 'Something went wrong',
          },
          message: 'users_fetch_precondition_failed',
        },
        users: null,
      };
    }
    return result;
  }

  public async updateProfile(
    profile: IUserUpdateDto,
    id: string,
  ): Promise<UserResponse> {
    try {
      const user: User = await this.userService.updateProfile(profile, id);

      return {
        users: user,
        result: {
          message: 'profile_update_success',
          errors: null,
          status: HttpStatus.OK,
        },
      };
    } catch (error) {}
  }
}
