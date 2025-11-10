import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { AuthGuard } from 'src/guards/auth.guard';
import { ActiveUserId } from 'src/shared/decorators/ActiveUser.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'me' })
  async getUserById(@ActiveUserId() userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }
}
