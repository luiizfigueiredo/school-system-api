import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignupResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  active: boolean;

  @Field()
  createdAt: Date;
}
