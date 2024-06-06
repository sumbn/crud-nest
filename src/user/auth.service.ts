import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(requestBody: RegisterUserDto) {
    const userFindByEmail = await this.userService.findByEmail(requestBody.email);

    //check

    if (userFindByEmail) {
      throw new BadRequestException('Email already Exist');
    }

    //hash

    const hashedPassword = await bcrypt.hash(requestBody.password, 10);

    requestBody.password = hashedPassword;
    //save to DB

    const savedUser = await this.userService.create(requestBody);

    //gen jwt
    const payload = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      role: savedUser.role,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      msg: 'user has been created',
      accessToken,
    };
  }

  async login(requestBody: LoginUserDto) {
    const userFindByEmail = await this.userService.findByEmail(requestBody.email);
    if (!userFindByEmail) {
      throw new BadRequestException('Invalid Credential!');
    }

    //check pass

    const isMatchPassword = await bcrypt.compare(requestBody.password, userFindByEmail.password);

    if (!isMatchPassword) {
      throw new BadRequestException('Invalid Credential!');
    }

    const payload = {
      id: userFindByEmail.id,
      firstName: userFindByEmail.firstName,
      lastName: userFindByEmail.lastName,
      email: userFindByEmail.email,
      role: userFindByEmail.role,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      msg: 'user login successfully',
      accessToken,
    };
  }
}
