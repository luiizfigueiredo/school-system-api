import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
}

registerEnumType(UserType, {
  name: 'UserType',
  description: 'The type of user in the system',
});
