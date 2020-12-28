import { Result } from '../common/utils.interface';

export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export type UserCreateResponse = {
  user: IUser | null;
  result: Result;
};

export type UsersResposne = {
  users: IUser[] | [] | null;
  result: Result;
};
