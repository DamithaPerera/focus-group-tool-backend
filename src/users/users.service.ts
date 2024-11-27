import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Find user by email
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Create a new user
  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    const numericId = parseInt(id, 10); // Convert id to a number
    return this.userRepository.findOne({ where: { id: numericId } });
  }

}
