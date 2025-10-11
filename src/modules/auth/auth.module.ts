import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { envValues } from 'src/shared/.env-values';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: envValues.JWT_SECRET, 
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [
    AuthService, 
    AuthResolver
  ],
  controllers: []
})
export class AuthModule {}
