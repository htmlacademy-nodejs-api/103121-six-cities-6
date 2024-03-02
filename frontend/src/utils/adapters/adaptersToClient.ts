import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import { User } from '../../types/types';

export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    name: user.name,
    email: user.email,
    avatarUrl: user.avatar,
    token: user.token,
    type: user.userType,
  });
