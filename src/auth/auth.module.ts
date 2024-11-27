import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
