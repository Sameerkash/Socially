import { User } from '../schema/user.schema';
import { Result } from './utils.interface';

export type UserCreateResponse = {
  user: User | null;
  result: Result;
};

export type UsersResponse = {
  result: Result;
  users: User[] | null | [];
};

export type UserResponse = {
  result: Result;
  users: User | null;
};
export interface IUserCreateDto {
  email: string;
  password: string;
  name: string;
  verified: boolean;
}

export interface IUserUpdateDto {
  password: string;
  name: string;
  verified: boolean;
}
