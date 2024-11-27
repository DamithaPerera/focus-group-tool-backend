import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  // Initiates Google OAuth login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  // Handles Google OAuth callback and returns user details
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return req.user; // Returns the authenticated user's profile
  }
}
