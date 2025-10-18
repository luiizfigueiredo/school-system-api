import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninResponse } from './models/signin-response.model';
import { SignupInput } from './inputs/signup.input';
import { BaseError } from 'src/shared/error/base-error';
import { SigninInput } from './inputs/signin.input';
import { SignupResponse } from './models/signup-response.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignupResponse)
  async signup(@Args('input') input: SignupInput): Promise<SignupResponse> {
    try {
      return await this.authService.signup(input);
    } catch (error) {
      throw new BaseError(error);
    }
  }

  @Mutation(() => SigninResponse)
  async signin(@Args('input') input: SigninInput): Promise<SigninResponse> {
    try {
      return await this.authService.signin(input);
    } catch (error) {
      throw new BaseError(error);
    }
  }
}
