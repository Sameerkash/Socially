import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument } from 'src/schema/authToken.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Token') private readonly tokenModel: Model<AuthDocument>,
  ) {}

  public createToken(userId: string): Promise<AuthDocument> {
    const token = this.jwtService.sign(
      { userId },
      { expiresIn: 30 * 24 * 60 * 60 },
    );

    return new this.tokenModel({
      userId: userId,
      token: token,
    }).save();
  }

  public async decodeToken(token: string) {
    const tokenModel = await this.tokenModel.find({
      token,
    });

    let result = null;

    if (tokenModel && tokenModel[0]) {
      try {
        const tokenData = this.jwtService.decode(tokenModel[0].token) as {
          exp: number;
          userId: any;
        };
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null;
        } else {
          result = {
            userId: tokenData.userId,
          };
        }
      } catch (e) {
        result = null;
      }
    }
    return result;
  }
}
