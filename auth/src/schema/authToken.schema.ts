import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = AuthToken & Document;

@Schema()
export class AuthToken {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  token: string;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
