import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document } from 'mongoose';

export type UserDocument = User & Document ;

@Schema()
export class User {
  @Prop({ requied: true })
  email: string;

  @Prop({ requied: true })
  name: string;

  @Prop({ requied: true })
  password: string;

  @Prop({ requied: true })
  verified: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
