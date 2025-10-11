import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/auth-response.model';
import { SignupInput } from './inputs/signup.input';
import { BaseError } from 'src/shared/error/base-error';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signup(@Args('input') input: SignupInput): Promise<AuthResponse> {
    try {
      return await this.authService.createUser(input);
    } catch (error) {
      throw new BaseError(error);
    }
  }
}