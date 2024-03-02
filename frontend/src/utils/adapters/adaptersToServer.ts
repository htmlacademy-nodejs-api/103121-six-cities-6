import CreateUserDto from '../../dto/user/create-user.dto';
import { UserRegister } from '../../types/types';

export const adaptSignupToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
    userType: user.type,
  });

export const adaptAvatarToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };
