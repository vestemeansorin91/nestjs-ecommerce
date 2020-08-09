import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/shared/user.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    console.log('here');
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    const user = await this.userService.findByLogin(userDto);
    const payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    const user = await this.userService.create(userDto);
    const payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
