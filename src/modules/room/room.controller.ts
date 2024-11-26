import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('v1/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() { name, adminId }: { name: string; adminId: number }) {
    return this.roomService.createRoom(name, adminId);
  }

  @Get()
  async getRooms() {
    return this.roomService.getRooms();
  }
}