import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // Validates or creates a user based on the profile
  async validateUser(profile: any): Promise<any> {
    const { email, name } = profile;
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.createUser({ email, name, role: 'participant' });
    }
    return user;
  }
}
