import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Participant } from './participant.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  adminId: number;

  @Column({ default: 'open' })
  status: string; // 'open' or 'closed'

  @OneToMany(() => Participant, (participant) => participant.room)
  participants: Participant[];
}
