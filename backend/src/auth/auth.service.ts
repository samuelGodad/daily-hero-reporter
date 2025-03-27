
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async register(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Create new user
    const user = await this.usersService.create(createUserDto);
    
    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        phone: user.phone,
        avatar: user.avatar,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async login(user: any) {
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        phone: user.phone,
        avatar: user.avatar,
      },
      token: this.jwtService.sign(payload),
    };
  }
}
