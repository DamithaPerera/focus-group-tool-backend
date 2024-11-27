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
}
