import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Initiates Google OAuth login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This route is just for redirection to Google's login
  }

  // Handles Google OAuth callback and returns or redirects
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = await this.authService.validateUser(req.user); // Validate or create the user

    // Example: Redirect to frontend with the user's ID or JWT
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?user=${user.id}`);
  }
}
