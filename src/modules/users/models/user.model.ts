import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field()
  rg: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  cep: string;

  @Field()
  birthDate: Date;

  @Field()
  active: boolean;

  @Field()
  createdAt: Date;
}
