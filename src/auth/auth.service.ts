import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(payload: any) {
    return this.userService.findByPayload(payload);
  }

  async signPayload(payload: any) {
    return sign(payload, 'secretKey', { expiresIn: '12h' });
  }
}
