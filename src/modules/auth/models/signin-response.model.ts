import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SigninResponse {
  @Field()
  accessToken: string;
}
