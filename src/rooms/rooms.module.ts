import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { LivekitModule } from '../livekit/livekit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), LivekitModule],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
