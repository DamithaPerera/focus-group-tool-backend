// src/modules/supabase/supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
  }

  // Fetch user by ID from Supabase's auth.users table
  async getUserById(userId: string) {
    const { data, error } = await this.supabase
      .from('auth.users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Method to insert user data into public.users table (custom user info)
  async createUser(userId: string, role: string) {
    const { data, error } = await this.supabase
      .from('public.users')
      .insert([
        { user_id: userId, role: role },  // Store the user role or other custom data
      ]);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getUser() {
    const { data: user, error } = await this.supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
}
