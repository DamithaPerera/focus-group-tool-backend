import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { LiveKitService } from '../../livekit/livekit.service';

@Controller('v1/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService,
              private readonly liveKitService: LiveKitService) {}

  @Post()
  async createRoom(@Body() { name, adminId }: { name: string; adminId: string }) {
    return this.roomService.createRoom(name, adminId);
  }

  @Post(':id/invite')
  async generateInvite(@Param('id') id: string, @Body() { role }: { role: string }) {
    return this.roomService.generateInviteLink(+id, role);
  }

  @Get('token')
  getLiveKitToken(
    @Query('room') room: string,
    @Query('identity') identity: string,
    @Query('role') role: 'moderator' | 'participant' | 'observer',
  ) {
    const token = this.liveKitService.generateToken(room, identity, role);
    return { token, serverUrl: this.liveKitService.getServerUrl() };
  }
}