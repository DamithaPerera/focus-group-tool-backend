import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Room } from './room.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Room, (room) => room.participants)
  room: Room;

  @Column()
  role: string; // 'moderator', 'participant', 'observer'
}
