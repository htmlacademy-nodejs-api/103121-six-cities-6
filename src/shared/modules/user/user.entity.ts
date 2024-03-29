import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { OfferEntity } from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    trim: true,
  })
  public name: string;

  @prop({
    unique: true,
    required: true,
    trim: true,
  })
  public email: string;

  @prop({
    required: false,
    default: '',
  })
  public avatar: string;

  @prop({
    required: true,
    trim: true,
  })
  public password: string;

  @prop({
    required: true,
    type: () => String,
    enum: UserType,
  })
  public userType: UserType;

  @prop({
    default: [],
    ref: () => UserEntity,
  })
  public favorites: Ref<OfferEntity>[];

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
