import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Room } from './src/rooms/room.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port:  5432,
  username: 'postgres' ,
  password: '123',
  database: process.env.DB_NAME,
  entities: [User, Room],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Use migrations instead of synchronize in production
});
