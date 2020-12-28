export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string ;
}


export interface IUserCreateResponse {
  status: number;
  message: string;
  user: IUser | null;
  errors: { [key: string]: any } | null;
}
