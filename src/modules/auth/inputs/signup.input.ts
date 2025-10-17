import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, IsDate, IsEnum } from 'class-validator';
import { UserType } from '../enums/user-type.enum';

@InputType()
export class SignupInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  rg: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  cep: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @Field(() => UserType)
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;
}
