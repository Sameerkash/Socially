import { User } from '../schema/user.schema';
import { Result } from './utils.interface';

/**
 *  UserCreateResponse
 *
 * Response for when the user signs up
 *
 * @param user
 * @param result
 */
export type UserCreateResponse = {
  user: User | null;
  result: Result;
};

/**
 *  UserCreateResponse
 *
 * Response object for fetching users
 *
 * @param user[]
 * @param result
 */
export type UsersResponse = {
  result: Result;
  users: User[] | null | [];
};

/**
 *  UserCreateResponse
 *
 * Reponse for when the user fetches his profile
 *
 * @param user
 * @param result
 */
export type UserResponse = {
  result: Result;
  users: User | null;
};

/**
 *  UserCreateDto
 *
 *
 * @param email
 * @param password
 * @param name
 * @param verfied
 *
 */
export interface IUserCreateDto {
  email: string;
  password: string;
  name: string;
  verified: boolean;
}

/**
 *  UserUpdateDto
 *
 * A Dto to update `user` profile
 *
 * @param email
 * @param password
 * @param name
 * @param verfied
 *
 */
export interface IUserUpdateDto {
  password: string;
  name: string;
  verified: boolean;
}
