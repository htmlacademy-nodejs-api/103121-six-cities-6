import { UserType } from './user-type';

export default class UserWithTokenDto {
  public email!: string ;

  public avatar!: string;

  public name!: string;

  public token!: string;

  public userType!: UserType;
}
