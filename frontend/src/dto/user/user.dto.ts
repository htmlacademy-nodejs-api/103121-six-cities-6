import { UserType } from './user-type';

export default class UserDto {
  public email!: string ;

  public avatar!: string;

  public name!: string;

  public id!: string;

  public userType!: UserType;
}
