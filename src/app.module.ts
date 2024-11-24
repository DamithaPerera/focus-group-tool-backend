import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Room } from './modules/room/room.entity';
import { Participant } from './modules/room/participant.entity';
import { User } from './modules/auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('SUPABASE_DB_URL'), // Use full connection string
        entities: [User, Room, Participant],
        synchronize: false, // Disable auto-sync in production
        logging: true,
      }),
    }),
  ],
})
export class AppModule {}
