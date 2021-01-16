import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserCreateDto, IUserUpdateDto } from 'src/interfaces/user.interface';
import { PaginationParams } from 'src/interfaces/utils.interface';
import { User, UserDocument } from 'src/schema/user.schema';
import { ConfigService } from './config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * updateUserById
   *
   * Updates the `user` confirmed status specified by id
   *
   * @param id string userId
   * @param userParams booelan is_confirmed
   */
  public async updateUserById(
    id: string,
    userParams: { is_confirmed: boolean },
  ): Promise<User> {
    return this.userModel.updateOne({ _id: id }, userParams).exec();
  }
  public async searchUser(params: { email: string }): Promise<User[]> {
    return this.userModel.find(params).exec();
  }

  /**
   * createUser
   *
   * creates a new user in the database
   *
   * @param user - takes in IUserCreateDto
   */
  public async createUser(user: IUserCreateDto): Promise<User> {
    const userModel = new this.userModel(user);
    return await userModel.save();
  }

  /**
   * fetchAllUsers
   *
   * @param page - Pagination paramas `skip` and `take`
   */
  public async fecthAllUsers(page: PaginationParams): Promise<User[]> {
    return this.userModel
      .find()
      .skip(page.skip)
      .limit(page.take);
  }

  /**
   * updateProfile
   *
   * updates the user details, `name`, `password` and `verified` status
   *
   * @param profile updateProfile params
   * @param id  string
   */
  public async updateProfile(
    profile: IUserUpdateDto,
    id: string,
  ): Promise<User> {
    return this.userModel
      .updateOne(
        { _id: id },
        {
          name: profile.name,
          password: profile.password,
          verified: profile.verified,
        },
      )
      .exec();
  }
}
