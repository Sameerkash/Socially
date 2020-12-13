import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { ConfigService } from './config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  public async updateUserById(id: string, userParams: {is_confirmed: boolean}): Promise<User> {
    return this.userModel.updateOne({_id: id}, userParams).exec();
  }

  public async createUser(user: User): Promise<User> {
    const userModel = new this.userModel(user);
    return await userModel.save();
  }
}
