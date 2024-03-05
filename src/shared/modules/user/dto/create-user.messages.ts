import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from './user.constant.js';

export const CreateUserMessages = {
  name: {
    invalidFormat: 'name is required',
    lengthField: `min length is ${MIN_NAME_LENGTH}, max is ${MAX_NAME_LENGTH}`,
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `min length for password is ${MIN_PASSWORD_LENGTH}, max is ${MAX_PASSWORD_LENGTH}`
  },
  userType: {
    invalid: 'userType must be a valid value'
  }
} as const;
