import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { Participant } from './participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Participant])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
