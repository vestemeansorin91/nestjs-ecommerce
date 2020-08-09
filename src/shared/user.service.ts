import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(userDto: RegisterDto) {
    const { username } = userDto;
    const user = await this.userModel.findOne({ username });

    if (user) {
      throw new HttpException(`User already exists `, HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDto: LoginDto) {
    const { username, password } = userDto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new HttpException(`Invalid credentials`, HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException(`Invalid credentials`, HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: any) {
    const { username } = payload;
    return this.userModel.findOne({ username });
  }

  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }
}
