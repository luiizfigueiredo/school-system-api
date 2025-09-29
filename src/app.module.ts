import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
