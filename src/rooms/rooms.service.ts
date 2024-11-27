import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { LivekitService } from '../livekit/livekit.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly livekitService: LivekitService,
  ) {}

  // Create a new room
  async createRoom(name: string): Promise<Room> {
    const room = this.roomRepository.create({
      name,
      uniqueIdentifier: Math.random().toString(36).substring(2, 15),
    });
    await this.livekitService.createRoom(room.uniqueIdentifier);
    return this.roomRepository.save(room);
  }

  // Generate invite link for a room
  async generateInviteLink(roomId: number, role: string, identity: string): Promise<string> {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) throw new Error('Room not found');
    const token = this.livekitService.generateToken(identity, room.uniqueIdentifier, role);
    return `${process.env.FRONTEND_URL}/room/${room.uniqueIdentifier}?token=${token}`;
  }
}
