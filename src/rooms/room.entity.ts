import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  uniqueIdentifier: string;

  @Column('jsonb', { default: [] })
  participants: { id: number; role: string }[];
}
