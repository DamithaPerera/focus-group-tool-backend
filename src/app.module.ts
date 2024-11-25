import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Room } from './modules/room/room.entity';
import { Participant } from './modules/room/participant.entity';
import { User } from './modules/auth/user.entity';
import { LiveKitModule } from './livekit/livekit.module';
import { RoomModule } from './modules/room/room.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('SUPABASE_DB_URL'),
        entities: [User, Room, Participant],
        synchronize: false,
        logging: true,
      }),
    }),
    AuthModule,
    RoomModule,
    LiveKitModule
  ],
})
export class AppModule {}
