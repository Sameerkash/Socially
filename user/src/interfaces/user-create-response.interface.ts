import { User } from '../schema/user.schema';

export interface IUserCreateResponse {
  status: number;
  message: string;
  user: User | null;
  errors: {[key: string]: any} | null;
}
