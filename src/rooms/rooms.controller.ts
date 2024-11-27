import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // Create a new room
  @Post()
  async createRoom(@Body() { name }: { name: string }) {
    return this.roomsService.createRoom(name);
  }

  // Generate invite link for a room
  @Post(':id/invite')
  async generateInviteLink(
    @Param('id') roomId: number,
    @Body() { role, identity }: { role: string; identity: string },
  ) {
    return this.roomsService.generateInviteLink(roomId, role, identity);
  }

  // Mute participant in a room
  @Post(':id/mute')
  async muteParticipant(
    @Param('id') roomId: number,
    @Body() { identity }: { identity: string },
  ) {
    return this.roomsService.muteParticipant(roomId, identity);
  }

  // Unmute participant in a room
  @Post(':id/unmute')
  async unmuteParticipant(
    @Param('id') roomId: number,
    @Body() { identity }: { identity: string },
  ) {
    return this.roomsService.unmuteParticipant(roomId, identity);
  }

  // Remove participant from a room
  @Post(':id/remove')
  async removeParticipant(
    @Param('id') roomId: number,
    @Body() { identity }: { identity: string },
  ) {
    return this.roomsService.removeParticipant(roomId, identity);
  }

  // Get participants in a room
  @Get(':id/participants')
  async getParticipants(@Param('id') roomId: number) {
    return this.roomsService.getParticipants(roomId);
  }
}
