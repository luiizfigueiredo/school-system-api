import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'userByEmail', nullable: true })
  // async findByEmail(@Args('email') email: string): Promise<User | null> {
  //   return this.usersService.findByEmail(email);
  // }
}
