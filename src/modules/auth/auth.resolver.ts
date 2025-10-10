import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/auth-response.model';
import { SignupInput } from './inputs/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signup(@Args('input') input: SignupInput): Promise<AuthResponse> {
    try {
      await this.authService.createUser(input);
      return {
        message: 'User created successfully',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message || 'Error creating user',
        success: false,
      };
    }
  }
}
