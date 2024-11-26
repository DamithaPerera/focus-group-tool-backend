import { Controller, Get, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../supabase/supabase.service';

@Controller('v1/rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {}

  @Get('join')
  async joinRoom(@Query('userId') userId: string) {
    const LIVEKIT_URL = this.configService.get<string>('LIVEKIT_SERVER_URL');
    const LIVEKIT_API_KEY = this.configService.get<string>('LIVEKIT_API_KEY');
    const LIVEKIT_SECRET_KEY = this.configService.get<string>('LIVEKIT_SECRET_KEY');

    // Fetch user details from Supabase
    let user = await this.supabaseService.getUserById(userId);

    // If user does not exist in public.users table, create the user
    if (!user) {
      const newUser = await this.supabaseService.createUser(userId, 'participant'); // Default role is 'participant'
      user = newUser[0]; // Assuming the user was created successfully
    }

    if (!user) {
      return { error: 'User not found' };
    }

    const { AccessToken } = await import('livekit-server-sdk');

    // Generate the LiveKit token
    const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_SECRET_KEY, {
      identity: userId,
    });

    // Add permissions to the token
    token.addGrant({
      room: 'room-' + userId,
      canPublish: true,
      canSubscribe: true,
    });

    // Generate the room URL dynamically
    const roomUrl = `${LIVEKIT_URL}/room/${'room-' + userId}`;

    return {
      roomUrl,
      token: token.toJwt(),
    };
  }
}