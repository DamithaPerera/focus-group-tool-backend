import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { Participant } from './participant.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Participant) private readonly participantRepository: Repository<Participant>,
  ) {}

  async createRoom(name: string, adminId: number) {
    const room = this.roomRepository.create({ name, adminId });
    return this.roomRepository.save(room);
  }

  async getRooms() {
    return this.roomRepository.find();
  }
}
