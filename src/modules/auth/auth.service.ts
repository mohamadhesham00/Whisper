import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiResponseUtil } from 'src/common/utils/api-response.util';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user)
      return ApiResponseUtil.throwError(
        'User not found',
        'USER_NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );

    const matches = await bcrypt.compare(pass, user.password);
    return matches ? user : null;
  }

  async login(user: LoginDto) {
    const validatedUser = await this.validateUser(user.email, user.password);
    if (!validatedUser) {
      return ApiResponseUtil.throwError(
        'Incorrect email or password',
        'INVALID_CREDENTIALS',
        HttpStatus.UNAUTHORIZED,
      );
    }
    console.log('Validated User:', validatedUser);
    return ApiResponseUtil.success({
      access_token: this.jwtService.sign({
        id: validatedUser.id,
        email: validatedUser.email,
      }),
    });
  }

  async register(userDto: CreateUserDto) {
    const newUser = await this.usersService.create(userDto);
    return this.login({
      email: newUser.email,
      password: userDto.password,
    });
  }
}
