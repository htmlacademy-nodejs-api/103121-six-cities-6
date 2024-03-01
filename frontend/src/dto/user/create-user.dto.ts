enum UserType {
  Common = 'Common',
  Pro = 'Pro',
}

export class CreateUserDto {
  public name!: string;

  public email!: string;

  public password!: string;

  public userType!: UserType;
}
