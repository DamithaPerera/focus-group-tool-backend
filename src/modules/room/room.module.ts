import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { LiveKitModule } from '../../livekit/livekit.module';

@Module({
  imports: [SupabaseModule, LiveKitModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
