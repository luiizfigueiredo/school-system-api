import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninResponse } from './models/signin-response.model';
import { SignupInput } from './inputs/signup.input';
import { BaseError } from 'src/shared/error/base-error';
import { SigninInput } from './inputs/signin.input';
import { SignupResponse } from './models/signup-response.model';
import { ChangePasswordResponse } from './models/change-password.model';
import { IsPublic } from 'src/shared/decorators/IsPublic.decorator';
import { ActiveUserId } from 'src/shared/decorators/ActiveUser.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Mutation(() => SignupResponse)
  async signup(@Args('input') input: SignupInput): Promise<SignupResponse> {
    try {
      return await this.authService.signup(input);
    } catch (error) {
      throw new BaseError(error);
    }
  }

  @IsPublic()
  @Mutation(() => SigninResponse)
  async signin(@Args('input') input: SigninInput): Promise<SigninResponse> {
    try {
      return await this.authService.signin(input);
    } catch (error) {
      throw new BaseError(error);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ChangePasswordResponse)
  async changePassword(
    @ActiveUserId() userId: string,
    @Args('newPassword') newPassword: string,
  ): Promise<ChangePasswordResponse> {
    try {
      return await this.authService.changePassword(userId, newPassword);
    } catch (error) {
      throw new BaseError(error);
    }
  }
}
