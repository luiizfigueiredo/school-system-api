import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { envValues } from 'src/shared/env-values';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: envValues.JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthService, AuthResolver, AuthGuard],
  controllers: [],
})
export class AuthModule {}
