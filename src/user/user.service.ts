import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { Permission } from '../helpers/checkPermission.helper';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  create(reqBody: RegisterUserDto) {
    const user = this.userRepo.create(reqBody);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async updateById(id: number, requestBody: UpdateUserDto, currentUser: UserEntity) {
    if (requestBody.role) {
      throw new BadRequestException('you can not change role');
    }

    let user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    Permission.check(id, currentUser);

    user = { ...user, ...requestBody };

    const updateUser = await this.userRepo.save(user);
    return {
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      email: updateUser.email,
    };
  }

  async deleteById(id: number, currentUser: UserEntity) {
    const user = await this.findById(id);

    Permission.check(id, currentUser);
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return this.userRepo.remove(user);
  }
}
