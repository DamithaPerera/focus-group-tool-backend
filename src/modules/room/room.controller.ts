import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('v1/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() { name, adminId }: { name: string; adminId: string }) {
    return this.roomService.createRoom(name, adminId);
  }

  @Post(':id/invite')
  async generateInvite(@Param('id') id: string, @Body() { role }: { role: string }) {
    return this.roomService.generateInviteLink(+id, role);
  }
}