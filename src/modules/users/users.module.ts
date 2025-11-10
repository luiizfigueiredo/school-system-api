import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  providers: [UsersService, UsersResolver, AuthGuard],
  controllers: [],
})
export class UsersModule {}
