import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class RoomService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createRoom(name: string, adminId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('rooms').insert({ name, admin_id: adminId }).select();
    if (error) throw error;
    return data[0];
  }

  async generateInviteLink(roomId: number, role: string) {
    const token = Buffer.from(`${roomId}:${role}`).toString('base64');
    const inviteLink = `${process.env.FRONTEND_URL}/room/${roomId}?invite=${token}`;
    return inviteLink;
  }
}
