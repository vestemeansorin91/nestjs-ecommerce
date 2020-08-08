import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    return this.userService.findByLogin(userDto);
  }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    return this.userService.create(userDto);
  }
}
