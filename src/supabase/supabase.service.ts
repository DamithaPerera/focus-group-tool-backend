import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
  }

  // Sign in with Google OAuth
  async signInWithOAuth(provider: string) {
    return this.supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.FRONTEND_URL}/login`,  // Set your frontend redirect URL here
      },
    });
  }

  // Get user info from the session
  async getUser() {
    const { data: user, error } = await this.supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
}
