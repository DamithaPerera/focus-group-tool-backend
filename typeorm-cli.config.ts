import { DataSource } from 'typeorm';
import { User } from './src/modules/auth/user.entity';
import { Room } from './src/modules/room/room.entity';
import { Participant } from './src/modules/room/participant.entity';

export default new DataSource({
  type: 'postgres',
  host: 'db.wrijjauspcqeijrmxqwl.supabase.co',
  port: 5432,
  username: 'postgres',
  password: 'damitha123perera', // Use raw password here
  database: 'postgres',
  entities: [User, Room, Participant],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: false,
});
