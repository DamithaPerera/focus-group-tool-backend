import { DataSource } from 'typeorm';
import { User } from './src/modules/auth/user.entity';
import { Room } from './src/modules/room/room.entity';
import { Participant } from './src/modules/room/participant.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.SUPABASE_HOST,
  port: 5432,
  username: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  database: process.env.SUPABASE_DB_NAME,
  entities: [User, Room, Participant],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: false,
});
