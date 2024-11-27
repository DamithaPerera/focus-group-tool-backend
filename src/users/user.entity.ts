import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: 'admin' | 'moderator' | 'participant' | 'observer';

  @Column({ nullable: true })
  roomId: number;
}
