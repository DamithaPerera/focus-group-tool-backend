import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly supabaseService: SupabaseService,  // Inject SupabaseService here
  ) {}

  @Get('google')
  async googleOAuth(@Req() req: any, @Res() res: any) {
    const { error } = await this.supabaseService.signInWithOAuth('google');
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  @Get('me')
  async getCurrentUser(@Req() req: any) {
    const user = await this.supabaseService.getUser();
    return user;
  }
}
